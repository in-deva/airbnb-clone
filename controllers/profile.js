// Packages
const express = require('express')
const router = express.Router()

// Get root
router.get('/', async (req, res) => {
  // console.log('profile get route')
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
      console.log(req.user)
      res.render('../views/profile', {
        userFull: req.user,
        user: req.user.name,
        auth: req.isAuthenticated()
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
  // Use the PATCH `/profile` controller to
  // update the user data in the database,
  //logout user and log back in with new credentials
  //then redirect to `/profile`
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
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
