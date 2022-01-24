require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI_DEV

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}