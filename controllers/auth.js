// Packages
const express = require('express')
const router = express.Router()

const Users = require('../models/users')

// Root
router.get('/', async (req, res) => {
  // console.log('auth get route (houses redirect)')
  try {
    res.redirect('/houses')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Get login
router.get('/login', async (req, res) => {
  // console.log('login get route')
  try {
    res.render('../views/login')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Get signup
router.get('/signup', async (req, res) => {
  // console.log('signup get route')
  try {
    // render
    res.render('../views/signup')
  } catch (err) {
    // !!! properly
    res.redirect('/error')
  }
})

// Post login
router.post('/login', async (req, res) => {
  // console.log('login post route')
  try {
    // find user with email and password match
    let user = await Users.findOne(req.body)
    if (user) {
      // login match
      req.login(user, err => {
        if (err) {
          throw 'error' //!!!properly - user already exists, go login, or else...
        }
        console.log('logged in')
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
  // console.log('signup post route')
  try {
    let user = await Users.create(req.body)
    // console.log('user created')
    //run identical login process
    // !!! (exact copy, make better)
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
  // console.log('logout get route')
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
