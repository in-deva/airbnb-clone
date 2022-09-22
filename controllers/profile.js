// Packages
const express = require('express')
const router = express.Router()

const Houses = require('../models/houses')

// Get root
router.get('/', async (req, res) => {
  console.log('profile get route')
  try {
    if (req.isAuthenticated()) {
      console.log('authed')
      // Use the GET /profile to also find in the database all houses that are listed by the user (using the host field),
      // !!! sort them on something? add date to model and sort on most recent?
      console.log(req.user._id)
      let listings = await Houses.find({ host: req.user._id })
      res.render('../views/profile', {
        userFull: req.user,
        user: req.user.name, // needs to be ditched
        auth: req.isAuthenticated(), // !!! what's this for again?
        listings
      })
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch root
router.patch('/', async (req, res) => {
  console.log('profile patch route')
  try {
    if (req.isAuthenticated()) {
      res.render('../views/profile')
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
