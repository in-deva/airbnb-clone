// Packages
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Model
module.exports = mongoose.model('reviews', {
  author: {
    type: id,
    required: true,
    reference: users
  },
  date: {
    type: date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  house: {
    type: id,
    required: true,
    reference: houses
  },
  rating: {
    type: number
  }
})
