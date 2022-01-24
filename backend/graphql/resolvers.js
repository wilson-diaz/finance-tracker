const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
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
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password != user.passHash) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    } 
  },
  Mutation: {
    recordTransaction: async (root, args, context) => {

      const transaction = new Transaction({...args, date: new Date(args.date)})
      await transaction.save()

      const user = await User.findOne({_id: args.user})
      user.transactions = user.transactions.concat(transaction)
      await user.save()

      return transaction
    }
  }
}