const express = require('express')
const { getUser, signUpUser, signInUser, updateUser, deleteUser } = require('../controller/auth.controllers')
const { messaging } = require('../../utils/messaging.utils')
const { messages, statuscode } = require('../../utils/messages.utils')
const { isAuthorizedAdmin, isAuthorizedUser } = require('../../utils/checkauthorize.utils')
const { authToken } = require('../../utils/checktoken.utils')
const router = express.Router()


router
    .post('/signup', signUpUser)
    .post('/signin', signInUser)
    .get('/getuser', getUser)
    .put('/update', authToken, isAuthorizedUser, updateUser)
    .delete('/delete/:username', authToken, isAuthorizedAdmin, deleteUser)



//* test for the JWT  
router.get('/protected', authToken, isAuthorizedAdmin, (req, res) => {
    return messaging(res, statuscode.statusSuccess, messages.statusSuccess)
})

router.get('/user/protected', authToken, (req, res) => {
    return messaging(res, statuscode.statusSuccess, messages.statusSuccess)
})

module.exports = router