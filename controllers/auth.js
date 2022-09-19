// Packages
const express = require('express')
const router = express.Router()

// Root
router.get('/', async (req, res) => {
  try {
    console.log('auth ok')
    // render
    // res.render('../views/houses/list')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get login
router.get('/login', async (req, res) => {
  try {
    console.log('ok')
    // render
    res.render('../views/login')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get signup
router.get('/signup', async (req, res) => {
  try {
    console.log('ok')
    // render
    res.render('../views/signup')
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
    res.render('../views/logout')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
