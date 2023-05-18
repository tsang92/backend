const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')
require('mongoose-type-email')

// schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true   
  },
  phone: {
    type: Number,
    required: true   
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Avaliable"
  },
  accessLevel: {
    type: Number,
    required: true
  },
  newUser: {
    type: Boolean,
    default: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  avatar: {
    type: String   
  }
}, { timestamps: true })

// encrypt password field on save
userSchema.pre('save', function(next) {
  // check if password is present and is modifed 
  if( this.password && this.isModified() ){
      this.password = Utils.hashPassword(this.password);
  }
  next()
})

// model
const userModel = mongoose.model('User', userSchema)
 
// export
module.exports = userModel