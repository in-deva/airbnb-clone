// Packages
const express = require('express')
const router = express.Router()
// Models
const Reviews = require('../models/reviews')

// Get reviews - should it be post?
router.post('/', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Use the POST `/reviews` controller to create a review, then redirect to the house page.
      await Reviews.create({
        author: req.user._id,
        house: req.body.house,
        description: req.body.description,
        rating: Number(req.body.rating)
      })
      console.log('review created')
      res.redirect(`houses/${req.body.house}`)
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    // !!!
    res.redirect('/error')
  }
})

// Post root
// router.post('/', async (req, res) => {
//   // console.log('reviews post route')
//   try {
//   } catch (err) {
//     // !!!
//     res.redirect('/error')
//   }
// })

// Export
module.exports = router
