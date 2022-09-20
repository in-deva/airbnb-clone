// Packages
const express = require('express')
const router = express.Router()

// Get root
router.get('/', async (req, res) => {
  try {
    console.log('profile ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      res.render('../views/profile')
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch root
router.patch('/', async (req, res) => {
  try {
    console.log('patch ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      res.render('../views/profile')
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
