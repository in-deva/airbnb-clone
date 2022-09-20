// Packages
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Model
module.exports = mongoose.model('houses', {
  description: {
    type: String,
    required: true
  },
  host: {
    type: id,
    required: true,
    reference: users
    // formatting correct on reference? !!!
  },
  location: {
    type: String,
    required: true
  },
  photos: {
    type: []
    // array 'of text'? !!!
  },
  price: {
    type: number,
    required: true
  },
  rooms: {
    type: number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

// default:,
// reference:,
