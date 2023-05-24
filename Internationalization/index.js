const express = require('express')
const languageController = require('./controller/language.controller')
const { checkHeader } = require('./middleware/checklanguage.middleware')
const router = express.Router()

router
    .get('/language', checkHeader, languageController.printMsg)

module.exports = router