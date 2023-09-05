const router = require('express').Router()
const redisServices = require('./services')

router
    .get('/redis', redisServices.rateLimit)
    .get('/demo', redisServices.testCache)

module.exports = router