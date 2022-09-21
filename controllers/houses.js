// Packages
const express = require('express')
const router = express.Router()

const Houses = require('../models/houses')

// Root
router.get('/', async (req, res) => {
  try {
    // Modify the GET `/houses` controller so that it
    // loads all documents from the `houses` collection
    // and passes them as the `houses` array to the view.
    // edit the view to display these (next section)
    console.log('houses ok')
    // function ifBlank(str) {
    // 	if (str == '') {return ('{ $gt: 0 }'}
    // 	else {return ('{ $lt: 0 }')}
    // }
    // console.log(req.query.price)
    let query = req.query.filtering
      ? {
          location: req.query.location,
          rooms: req.query.rooms,
          price:
            req.query.maxPrice == '' ? { $gte: 0 } : { $lt: req.query.maxPrice }
          // { $lt: req.query.maxPrice },
          // title: { $regex: req.query.title, $options: 'i' }
        }
      : {}

    // Allow Any
    if (query.location == 'any') delete query.location
    if (query.rooms == 'any') delete query.rooms
    // if (query.price == 'any') delete query.maxPrice

    let houses = await Houses.find(query)

    console.log('here')
    if (req.isAuthenticated()) {
      res.render('houses/list', {
        // change to just user & update templates
        user: req.user.name,
        auth: req.isAuthenticated(),
        houses
      })
    } else {
      res.render('houses/list', { houses })
    }
  } catch (err) {
    // change for next function and throw errors
    console.log('failed on houses route')
    res.redirect('/error')
  }
})

// Get create
router.get('/create', async (req, res) => {
  try {
    console.log('create ok')
    if (req.isAuthenticated()) {
      // console.log(req.user._id)
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
    let house = await Houses.findById(req.params.id)
    let housePop = await Houses.findById(req.params.id).populate('host')
    // console.log(housePop)
    // console.log(housePop.host.name)
    // let bodyy = await req.query
    // console.log(bodyy)
    //console.log(req.params)
    // console.log(bodyy._id)
    // console.log(house)
    // console.log('here')
    // console.log(housePop)
    // console.log(house.populate('host'))
    // console.log(house)
    // Populate its host field - ???
    // Render the houses/one template, passing the house object
    res.render('../views/houses/one', {
      user: req.user.name,
      auth: req.isAuthenticated(),
      house, // !!! - can I do await in-line here?
      hostName: housePop.host.name,
      hostAvatar: housePop.host.avatar
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
        console.log(house)
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
