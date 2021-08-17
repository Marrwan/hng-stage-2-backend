const express = require('express')
const { getHomepage,contactHandler } = require('../controllers')

const route = express.Router()

route.get('/', getHomepage)
route.post('/contact', contactHandler)

module.exports = route