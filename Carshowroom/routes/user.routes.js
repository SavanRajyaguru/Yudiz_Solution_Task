const { insetUserDetails, insertBuysCar } = require('../controller/user.controller')
const { isMatchedCity } = require('../middleware/user_city.middleware')

const router = require('express').Router()

router
    .post('/insert-details', insetUserDetails)
    .post('/buy-car', isMatchedCity, insertBuysCar)

module.exports = router