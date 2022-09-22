// Packages
const express = require('express')
const router = express.Router()
const Bookings = require('../models/bookings')

// Get ...
router.post('/', async (req, res) => {
  console.log('bookings post route')
  try {
    if (req.isAuthenticated()) {
      console.log('authed')
      //let booking = req.body
      //     console.log(booking)
      // Use the POST `bookings` controller to create a booking in the database:
      // use the logged in user as the `author` field
      // use the `house` value from the hidden field
      let booking = {
        author: req.user._id,
        house: req.body.house,
        description: req.body.description
      }
      console.log(booking)
      await Bookings.create(booking)

      // then render page with 'booking complete block (haven't actually made this yet)'
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
