// Packages
const express = require('express')
const router = express.Router()

const Users = require('../models/users')

// Root
router.get('/', async (req, res) => {
  try {
    console.log('auth ok')
    // render
    // res.render('../views/houses/list')
    // !!! test this works
    res.redirect('/houses')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get login
router.get('/login', async (req, res) => {
  try {
    console.log('ok its this one')
    // render
    res.render('../views/login')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get signup
router.get('/signup', async (req, res) => {
  try {
    console.log('ok')
    // render
    res.render('../views/signup')
  } catch (err) {
    res.redirect('/error')
  }
})

// Post login
router.post('/login', async (req, res) => {
  try {
    // console.log('login okkkkkk')
    // console.log(req.body)
    // find user with email and password match
    let user = await Users.findOne(req.body)
    if (user) {
      // console.log('its a match - now log the fuck in')
      // login match
      req.login(user, err => {
        if (err) {
          throw 'shit'
        }
        // console.log('woo. what`s it mean now then')
        // if (req.isAuthenticated()) {
        //   console.log('authed')
        // } else {
        //   console.log('nat authed')
        // }
        console.log('logged in')
        res.redirect('../houses')
      })
    } else {
      console.log('uh oh - throw email/pw error here')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Post signup
router.post('/signup', async (req, res) => {
  try {
    console.log('signup post ok')
    // console.log(req.body)
    let user = await Users.create(req.body)
    console.log(user)
    console.log('user created')
    //run login process like in the login post Router (exact copy, make better)
    user = await Users.findOne(req.body)
    if (user) {
      req.login(user, err => {
        if (err) {
          throw 'shit'
        }
        console.log('logged in - do that bit here')
        res.redirect('/houses')
      })
    } else {
      console.log('uh oh - throw email/pw error here')
    }
    // redirect to houses route
  } catch (err) {
    console.log('well at least it failed here')
    res.redirect('/error')
  }
})

// Get logout
router.get('/logout', async (req, res) => {
  try {
    console.log('logout ok')
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
    res.redirect('/error')
  }
})

// Export
module.exports = router
