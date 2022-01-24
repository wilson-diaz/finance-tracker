const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Transaction = require('./models/transaction')
const Category = require('./models/category')

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('successfully connected to mongodb'))
  .catch((error) => console.log('mongodb error', error.message))


const typeDefs = gql`
  type User {
    id: ID
    username: String
    categories: [Category]
    transactions: [Transaction]
  }

  type Category {
    name: String
    isEnabled: Boolean
    user: User
  }

  type Transaction {
    id: ID
    date: String
    amount: Float
    details: String
    category: Category
    user: User
  }

  type Query {
    transactions(
      username: String
    ): [Transaction]
    login(
      username: String!
      password: String!
    ): Token
  }

  type Token {
    value: String!
  }

  type Mutation {
    recordTransaction(
      date: String!
      amount: Float!
      details: String
      category: String! 
    ): Transaction
    addCategory(
      name: String!
    ): Category
    editCategory(
      isEnabled: Boolean
      name: String
    ): Category
    createUser(
      username: String!
      passHash: String!
    ): User
  }
`;

const resolvers = {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at: ${url}`)
})
