const { insetBrandDetails } = require('../controller/brand.controller')

const router = require('express').Router()

router
    .post('/', insetBrandDetails)

module.exports = router