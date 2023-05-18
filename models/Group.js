const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, { timestamps: true })

// model
const groupModel = mongoose.model('Group', groupSchema)
 
// export
module.exports = groupModel