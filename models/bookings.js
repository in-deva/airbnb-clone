// Packages
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Model
module.exports = mongoose.model('bookings', {
  author: {
    type: id,
    required: true,
    reference: users
  },
  date: {
    type: date,
    required: true,
    default: now
  },
  description: {
    type: String,
    required: true
  },
  house: {
    type: String,
    required: true,
    reference: houses
  }
})
