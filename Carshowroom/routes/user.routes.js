const { insetUserDetails, insertBuysCar, showDetails } = require('../controller/user.controller')
const { isMatchedCity } = require('../middleware/user_city.middleware')

const router = require('express').Router()

router
    .post('/insert-details', insetUserDetails)
    .post('/buy-car', insertBuysCar)
    .get('/show-details', showDetails)

module.exports = router