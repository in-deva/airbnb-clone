// Packages
const express = require('express')
const router = express.Router()

// Get root
router.get('/', async (req, res) => {
  try {
    console.log('reviews get ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      // res.render('../views/reviews')
      // , {
      //   user: req.user.name,
      //   auth: req.isAuthenticated()
      // }
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Post root
router.post('/', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
