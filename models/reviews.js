// Packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Model
module.exports = mongoose.model('reviews', {
  author: {
    type: ObjectId,
    required: true,
    ref: 'users'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  house: {
    type: ObjectId,
    required: true,
    reference: 'houses'
  },
  rating: {
    type: Number
  }
})
