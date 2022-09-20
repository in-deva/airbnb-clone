// Packages
const express = require('express')
const router = express.Router()

// Root
router.get('/', async (req, res) => {
  try {
    console.log('houses ok')
    res.render('../views/houses/list')
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
      res.render('../views/houses/create')
      console.log('authed')
    } else {
      console.log('not logged in')
      res.redirect('/error')
    }
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id
router.get('/:id', async (req, res) => {
  try {
    console.log('ok')
    res.render('../views/houses/one')
  } catch (err) {
    res.redirect('/error')
  }
})

// Get :id/edit
router.get('/:id/edit', async (req, res) => {
  try {
    console.log('ok')
    res.render('../views/houses/edit')
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

// Patch :id
router.patch('/', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Delete :id
router.delete('/:id', async (req, res) => {
  try {
    console.log('ok')
  } catch (err) {
    res.redirect('/error')
  }
})

// Export
module.exports = router
