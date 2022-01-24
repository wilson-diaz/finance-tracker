const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Category = require('../models/category')

module.exports = {
  Query: {
    transactions: async (root, args, context) => {
      if (!args.username) { return [] }
      
      const user = await User.findOne({ username: args.username }).populate('transactions')
      // populate transaction categories
      console.log(user)
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