// Packages
const express = require('express')
const router = express.Router()
// Models
const Bookings = require('../models/bookings')

// Post ...
router.post('/', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let booking = {
        author: req.user._id,
        house: req.body.house,
        description: req.body.description
      }
      await Bookings.create(booking)
      res.redirect(`/houses/${req.body.house}`)
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
