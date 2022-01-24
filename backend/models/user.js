const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passHash: {
    type: String,
    required: true
  },
  categories: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  transactions: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
})

module.exports = mongoose.model('User', schema)