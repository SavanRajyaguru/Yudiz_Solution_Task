const express = require('express')
const { getUser, insertUser, deleteUser, updateUser } = require('../controller/userlogin.controllers')
const validator = require('../middleware/userInput.middleware')
const router = express.Router()

router.get('/', getUser)

router.post('/signup', insertUser)

router.post('/signin', validator.userPasswordConverter)

router.delete('/:id', deleteUser)

router.patch('/:id', validator.userInput, updateUser)

module.exports = router