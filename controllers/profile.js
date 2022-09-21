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
      console.log(req.user._id)
      let listings = await Houses.find({ host: req.user._id })
      // console.log(listings)
      //.sort(
      //   req.query.sort ? req.query.sort : 'price'
      // )
      //and pass them to the template as the houses array.
      // In the view, use the houses array to display the data instead of the hardcoded houses.
      // Make sure that for each house, the "View" button points to /houses/ID_OF_HOUSE and the "Edit" button to /houses/ID_OF_HOUSE/edit (replace ID_OF_HOUSE with the actual _id of the house).
      // The "List a House" button should point to /houses/create

      res.render('../views/profile', {
        userFull: req.user,
        user: req.user.name, // needs to be ditched
        auth: req.isAuthenticated(), //what's this for again?
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
      // console.log('authed')
      // Use the PATCH `/profile` controller to
      // update the user data in the database,
      //logout user and log back in with new credentials
      //then redirect to `/profile`
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
