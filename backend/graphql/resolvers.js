const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Category = require('../models/category')

module.exports = {
  Query: {
    userTransactions: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')
      
      const user = await User.findOne({ id: currentUser.id }).populate('transactions')
      // populate transaction categories
      await Promise.all(user.transactions.map(async t => await t.populate('category')))

      return user.transactions
    },
    userCategories: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const user = await User.findById(currentUser.id).populate('categories')

      return user.categories
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passMatch = await bcrypt.compare(args.password, user.passHash)

      if (!user || !passMatch) throw new AuthenticationError('Incorrect credentials. Please retry.')

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    } 
  },
  Mutation: {
    recordTransaction: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const transaction = new Transaction({ ...args, user: currentUser.id })
      await transaction.save()

      const user = await User.findOne({ _id: currentUser.id })
      user.transactions = user.transactions.concat(transaction)
      await user.save()

      return await transaction.populate('category')
    },
    addCategory: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const category = new Category({ name: args.name.trim(), isEnabled: true })

      // update user
      const user = await User.findById(currentUser.id)
      user.categories = user.categories.concat(category.id)
      await user.save()

      return await category.save()
    },
    editCategory: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const category = await Category.findById(args.id)

      // nothing to edit
      if (!("name" in args) && !("isEnabled" in args)) return category

      if ("name" in args) {
        // avoid whitespace input
        if (args.name.trim() === '') throw new UserInputError('Category name cannot be empty.')

        // else
        category.name = args.name.trim()
      }

      if ("isEnabled" in args) {
        category.isEnabled = args.isEnabled
      }

      return await category.save()
    },
    createUser: async (root, args) => {
      const passHash = await bcrypt.hash(args.password, 10)
      const newUser = new User({ username: args.username, passHash, categories: [], transactions: [] })

      return await newUser.save()
    }
  }
}