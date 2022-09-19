// Packages
const express = require('express')
const router = express.Router()

// Root
router.get('/', async (req, res) => {
  try {
    console.log('auth ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get login
router.get('/login', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get signup
router.get('/signup', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Post login
router.post('/login', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Post signup
router.post('/signup', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get logout
router.get('/logout', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
