const { insertCarsDetails } = require('../controller/cars.controller')

const router = require('express').Router()

router
    .post('/', insertCarsDetails)

module.exports = router