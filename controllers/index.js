// Packages
const express = require('express')
const router = express.Router()

// Get index
router.get('/', async (req, res) => {
  try {
    res.redirect('/houses')
  } catch (err) {
    // !!! throw error properly
    res.redirect('/error')
  }
})

// Export
module.exports = router
