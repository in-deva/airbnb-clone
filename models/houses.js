// Packages
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Model
module.exports = mongoose.model('houses', {
  title: {
    type: String
    // required: true
  },
  description: {
    type: String
    // required: true
  },
  rooms: {
    type: Number
    // required: true
  },
  location: {
    type: String
    // required: true
  },
  price: {
    type: Number
    // required: true
  },
  photos: {
    type: []
    // array 'of text'? !!!
  },
  host: {
    type: ObjectId,
    required: true,
    ref: 'users'
    // formatting correct on reference? !!!
  }
})

// default:,
// reference:,
