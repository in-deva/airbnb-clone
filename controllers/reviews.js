// Packages
const express = require('express')
const router = express.Router()

// Get ...
router.get('/', async (req, res) => {
  try {
    console.log('reviews ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
