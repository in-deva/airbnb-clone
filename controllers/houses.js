// Packages
const express = require('express')
const router = express.Router()

const Houses = require('../models/houses')

// Root
router.get('/', async (req, res) => {
  try {
    console.log('houses ok')
    // console.log(req.user)
    // if (req.user) {
    //   let userName = req.user
    // } else {
    //   let userName = undefined
    // }
    // console.log(req.user.name)
    // let user = await req.user
    // console.log(user.name)
    // console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      res.render('../views/houses/list', {
        user: req.user.name,
        auth: req.isAuthenticated()
      })
    } else {
      res.render('../views/houses/list')
    }
  } catch (err) {
    console.log('failed on houses route')
    res.redirect('/error')
  }
})

// Get create
router.get('/create', async (req, res) => {
  try {
    console.log('create ok')
    if (req.isAuthenticated()) {
      console.log(req.user._id)
      res.render('../views/houses/create', {
        user: req.user.name,
        auth: req.isAuthenticated(),
        hostID: req.user._id
      })
      console.log('authed')
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id
router.get('/:id', async (req, res) => {
  try {
    // 		Modify the GET /houses/:id controller to:
    // Find the document in the houses collection by id
    console.log('now in house/:id get route')
    // let bodyy = await req.body
    // console.log(bodyy)
    // console.log(req.params.id)
    // console.log(bodyy._id)
    let house = await Houses.findById(req.params.id)
    console.log(house)
    console.log('here')
    console.log(house.populate('host'))
    // console.log(house)
    // Populate its host field - ???
    // Render the houses/one template, passing the house object
    res.render('../views/houses/one', {
      user: req.user.name,
      auth: req.isAuthenticated(),
      house // !!! - can I do await in-line here?
    })
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id/edit
router.get('/:id/edit', async (req, res) => {
  try {
    console.log('edit ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      res.render('../views/houses/edit', {
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

// Post root
router.post('/', async (req, res) => {
  try {
    console.log('post ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      console.log('and now we are here')
      // console.log(req.user._id)
      // console.log(req.body)
      req.body.host = req.user._id
      // console.log((req.body.host = req.user._id))
      // console.log(req.body)
      try {
        await Houses.create(req.body)
        console.log('house created')
        // now make it go to the newly created houses page - linked through the created house's id to the get /:id route
        let house = await Houses.findOne(req.body)
        // console.log(house)
        // console.log(house._id)
        res.redirect(`houses/${house._id}`)
      } catch (err) {
        console.log('nah the form fucked it mate')
      }
      // console.log(user)

      // res.render('../views/houses/??')
      // code here from the crate a house form to input it into db
      // houses folder using houses model
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch :id
router.patch('/', async (req, res) => {
  try {
    console.log('patch ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      // res.render('../views/houses/edit')
    } else {
      console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Delete :id
router.delete('/:id', async (req, res) => {
  try {
    console.log('delete ok')
    if (req.isAuthenticated()) {
      console.log('authed')
      res.render('../views/houses/edit')
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
