// Packages
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Model
module.exports = mongoose.model('users', {
  avatar: {
    type: text
  },
  email: {
    type: text,
    required: true
  },
  name: {
    type: text,
    required: true
  },
  password: {
    type: text,
    required: true
  }
})
