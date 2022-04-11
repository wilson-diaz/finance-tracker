const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Category = require('../models/category')

module.exports = {
  Category: {
    numTransactions: async (root) => {
      return await Transaction.where({ category: root.id }).countDocuments()
    }
  },
  Query: {
    userTransactions: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')
      
      return await Transaction.find({ user: currentUser.id }).populate('category')
    },
    userCategories: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      return Category.find({ user: currentUser.id })
    },
    login: async (root, args) => {
      if (!args.username || !args.password) throw new UserInputError('Please enter your credentials.')

      const user = await User.findOne({ username: args.username })
      const passMatch = user ? await bcrypt.compare(args.password, user.passHash) : null

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

      return await transaction.populate('category')
    },
    editTransaction: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const transaction = await Transaction.findById(args.id)
      if (!transaction) throw new UserInputError('No transaction with this ID.')

      if (currentUser.id !== transaction.user.toString()) throw new ForbiddenError('You do not have permission to delete this transaction.')

      transaction.set({
        date: args.date,
        amount: args.amount,
        details: args.details,
        category: args.category
      })

      await transaction.save()
      return await transaction.populate('category')
    },
    deleteTransaction: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const transaction = await Transaction.findById(args.id)
      if (!transaction) throw new UserInputError('No transaction with this ID.')

      if (currentUser.id !== transaction.user.toString()) throw new ForbiddenError('You do not have permission to delete this transaction.')

      await Transaction.findByIdAndDelete(transaction.id)

      return transaction.id
    },
    addCategory: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      // check unique
      const temp = await Category.find({ name: args.name.trim(), user: currentUser.id })
      if (temp.length !== 0) throw new UserInputError('Category with this name already exists. Enter unique name.')

      const category = new Category({ name: args.name.trim(), isEnabled: true, user: currentUser.id })

      return await category.save()
    },
    editCategory: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const category = await Category.findById(args.id)
      if (!category) throw new UserInputError('No category with this ID.')

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
    deleteCategory: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated! Please log in.')

      const category = await Category.findById(args.id)
      if (!category) throw new UserInputError('No category with this ID.')
      if (currentUser.id !== category.user.toString()) throw new ForbiddenError('You do not have permission to delete this category.')

      await Category.findByIdAndDelete(category.id)
      await Transaction.deleteMany({ category: category.id })

      return category.id
    },
    createUser: async (root, args) => {
      // check unique
      const temp = await User.find({ username: args.username })
      if (temp.length !== 0) throw new UserInputError('User with this username already exists. Enter unique username.')

      const passHash = await bcrypt.hash(args.password, 10)
      const newUser = new User({ username: args.username, passHash })

      return await newUser.save()
    }
  }
}