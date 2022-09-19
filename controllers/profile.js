// Packages
const express = require('express')
const router = express.Router()

// Get root
router.get('/', async (req, res) => {
  try {
    console.log('profile ok')
    res.render('../views/profile')
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch root
router.patch('/', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
