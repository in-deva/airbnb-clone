// Packages
const express = require('express')
const router = express.Router()

// Get ...
router.get('/', async (req, res) => {
  // console.log('index get route')
  try {
    res.redirect('/houses')
  } catch (err) {
    // !!! throw error properly
    res.redirect('/error')
  }
})

// Export
module.exports = router
