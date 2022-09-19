// Packages
const express = require('express')
const router = express.Router()

// Get root
router.get('/', async (req, res) => {
  try {
    console.log('reviews ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Post root
router.post('/', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
