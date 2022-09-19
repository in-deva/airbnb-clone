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
    type: text,
    required: true
  },
  house: {
    type: text,
    required: true,
    reference: houses
  }
})
