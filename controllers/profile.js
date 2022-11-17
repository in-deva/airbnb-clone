// Packages
const express = require('express')
const router = express.Router()
// Models
const Houses = require('../models/houses')

// Get root
router.get('/', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Use the GET /profile to also find in the database all houses that are listed by the user (using the host field),
      // !!! sort them on something? add date to model and sort on most recent?
      // console.log(req.user._id)
      let listings = await Houses.find({ host: req.user._id })
      let noListings = listings.length == 0 ? true : false
      res.render('../views/profile', {
        user: {
          name: req.user.name,
          avatar: req.user.avatar,
          email: req.user.email
        },
        auth: req.isAuthenticated(), // !!! what's this for again?
        listings,
        noListings
      })
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch root
router.patch('/', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.render('../views/profile')
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
