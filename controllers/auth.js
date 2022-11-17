// Packages
const express = require('express')
const router = express.Router()
// Models
const Users = require('../models/users')

// Root
router.get('/', async (req, res) => {
  try {
    res.redirect('/houses')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Get login
router.get('/login', async (req, res) => {
  try {
    // !!! if alrady authed, redirect to houses page
    res.render('../views/login')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Get signup
router.get('/signup', async (req, res) => {
  try {
    res.render('../views/signup')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Post login
router.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne(req.body)
    if (user) {
      req.login(user, err => {
        if (err) {
          throw 'error'
          //!!!properly - user already exists, go login, or else...
          // email or password is incorrect (if no match found, display this... (with signup/forgot passwrod option))
        }
        res.redirect('../houses')
      })
    } else {
      console.log('uh oh - throw email/pw error here - !!! properly')
    }
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Post signup
router.post('/signup', async (req, res) => {
  try {
    let user = await Users.create(req.body)
    // !!! (exact copy, make better)
    // !!! display better - user already exists - login?
    user = await Users.findOne(req.body)
    if (user) {
      req.login(user, err => {
        if (err) {
          throw 'error' //!!!properly - user already exists, go login, or else...
        }
        res.redirect('/houses')
      })
    } else {
      console.log('throw email/pw error here - !!! properly')
    }
    // redirect to houses route
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Get logout
router.get('/logout', async (req, res) => {
  try {
    req.logout()
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.clearCookie('connect.sid')
      console.log('logged out')
      res.redirect('/auth/login')
    })
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Export
module.exports = router
