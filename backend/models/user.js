const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passHash: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema)