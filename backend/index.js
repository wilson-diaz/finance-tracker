const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const User = require('./models/user')

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('successfully connected to mongodb'))
  .catch((error) => console.log('error connecting to mongodb', error.message))

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
  },
  cors: true
})

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`GraphQL server ready at: ${url}`)
})
