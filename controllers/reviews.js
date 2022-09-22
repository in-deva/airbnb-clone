// Packages
const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews')

// Get root
router.post('/', async (req, res) => {
  try {
    // console.log('reviews get route')
    if (req.isAuthenticated()) {
      // Use the POST `/reviews` controller to create a review, then redirect to the house page.
      await Reviews.create({
        author: req.user._id,
        house: req.body.house,
        description: req.body.description
      })
      // console.log('review created')
      res.redirect(`houses/${req.body.house}`)
    } else {
      // console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    // !!!
    res.redirect('/error')
  }
})

// Post root
router.post('/', async (req, res) => {
  // console.log('reviews post route')
  try {
  } catch (err) {
    // !!!
    res.redirect('/error')
  }
})

// Export
module.exports = router
