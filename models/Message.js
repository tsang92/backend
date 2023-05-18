const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const messageSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true 
  },
  message: {
    type: String,
    required: true 
  },
  comments: [{
    author: {
      type: String,
    required: true 
    },
    userComment: {
      type: String,
      required: true 
    },
    created: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true })

// model
const messageModel = mongoose.model('Message', messageSchema)
 
// export
module.exports = messageModel