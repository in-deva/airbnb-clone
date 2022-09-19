// Packages
const express = require('express')
const router = express.Router()

// Get ...
router.post('/', async (req, res) => {
  try {
    console.log('bookings ok')
    // res.render('../views/booking')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
