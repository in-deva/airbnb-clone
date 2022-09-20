// Packages
const express = require('express')
const router = express.Router()

// Get ...
router.post('/', async (req, res) => {
  try {
    console.log('bookings ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      // res.render('../views/bookings')
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
