const { insertSellerDetails, insertCars } = require('../controller/seller.controller')

const router = require('express').Router()

router
    .post('/insert-details', insertSellerDetails)
    .post('/add-cars', insertCars)

module.exports = router