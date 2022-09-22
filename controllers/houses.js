// Packages
const express = require('express')
const router = express.Router()
const Houses = require('../models/houses')
const Bookings = require('../models/houses')

// Root
router.get('/', async (req, res) => {
  // console.log('houses get route')
  try {
    // if query set filter object else blank object
    let query = req.query.filtering
      ? {
          location: req.query.location,
          rooms: req.query.rooms,
          price:
            req.query.maxPrice == ''
              ? { $gte: 0 }
              : { $lt: req.query.maxPrice },
          title: { $regex: req.query.title, $options: 'i' }
        }
      : {}
    // delete 'any' from folder filter
    if (query.location == 'any') delete query.location
    if (query.rooms == 'any') delete query.rooms
    // sort results
    let houses = await Houses.find(query).sort(
      req.query.sort ? req.query.sort : 'price'
    )
    // render with different navbars
    if (req.isAuthenticated()) {
      res.render('houses/list', {
        // !!! change to just user & update templates
        user: req.user.name,
        auth: req.isAuthenticated(),
        houses
      })
    } else {
      res.render('houses/list', { houses })
    }
  } catch (err) {
    // !!! change for next function and throw errors
    res.redirect('/error')
  }
})

// Get create
router.get('/create', async (req, res) => {
  // console.log(houses/create get route)
  try {
    if (req.isAuthenticated()) {
      res.render('../views/houses/create', {
        user: req.user.name,
        auth: req.isAuthenticated(),
        hostID: req.user._id
      })
    } else {
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id
router.get('/:id', async (req, res) => {
  // console.log('houses/:id get route')
  try {
    // !!! fix these - house vs housePop
    let house = await Houses.findById(req.params.id)
    let housePop = await Houses.findById(req.params.id).populate('host')
    // Render the houses/one template, passing the house object
    if (req.isAuthenticated()) {
      // console.log('authed')
      res.render('../views/houses/one', {
        // !!! Populate its host field with host object - then pull user.name - ???
        user: req.user.name,
        auth: req.isAuthenticated(),
        house, // !!! - can I do await in-line here?
        hostName: housePop.host.name,
        hostAvatar: housePop.host.avatar
      })
    } else {
      res.render('../views/houses/one', {
        // !!! Populate its host field with host object - then pull user.name - ???
        // user: req.user.name,
        // auth: req.isAuthenticated(),
        house, // !!! - can I do await in-line here?
        hostName: housePop.host.name,
        hostAvatar: housePop.host.avatar
      })
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id/edit
router.get('/:id/edit', async (req, res) => {
  console.log('houses/id/edit get route')
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
      // console.log(req.query.listingID)
      let house = await Houses.findById(req.query.listingID)
      // console.log(house)
      res.render('../views/houses/edit', {
        user: req.user.name,
        auth: req.isAuthenticated(),
        house
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
  // console.log('houses post route')
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
      req.body.host = req.user._id
      // !!! remove nested catch
      try {
        // console.log('created house')
        await Houses.create(req.body)
        // go to the house page of the newly created house
        let house = await Houses.findOne(req.body)
        res.redirect(`houses/${house._id}`)
      } catch (err) {
        console.log('error - !!! do these properly')
      }
    } else {
      // console.log('not logged in')
      res.redirect('/auth/login')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Patch :id
router.patch('/:id', async (req, res) => {
  console.log('houses/:id patch route')
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
      // extract command, clean object for find
      command = req.body.command
      // console.log(command)
      delete req.body.command
      // console.log('body:')
      // console.log(req.body)
      // console.log(req.params.id)
      // let house = await Houses.findOne(req.body)
      // let house = await Houses.findById(req.params.id)
      // console.log(house)
      if (command == 'update') {
        // update house in db
        console.log('update')
        // !!! doesn't update photos
        await Houses.findByIdAndUpdate(req.params.id, req.body)
        // redirect to that house page
        res.redirect(`/houses/${req.params.id}`)
      } else {
        // delete house from db
        console.log('delete')
        await Houses.findByIdAndDelete(req.params.id)
        console.log('deleted')
        // redirect to profile
        res.redirect('/profile')
        console.log('house deleted')
        // backburner: are you sure?
      }
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
  // console.log('houses delete route')
  try {
    if (req.isAuthenticated()) {
      // console.log('authed')
      // !!! house delete code here ...
      // res.render('../views/houses/edit')
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
