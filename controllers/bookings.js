// Packages
const express = require('express')
const router = express.Router()
const Bookings = require('../models/bookings')

// Post ...
router.post('/', async (req, res) => {
  console.log('bookings post route')
  try {
    if (req.isAuthenticated()) {
      console.log('authed')
      // create booking
      let booking = {
        author: req.user._id,
        house: req.body.house,
        description: req.body.description
      }
      await Bookings.create(booking)
      res.redirect(`/houses/${req.body.house}`)
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
