const config = require('../../config/config')
const createHash = require('../../utils/createhash.utils')
const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const User = require('../schemas/users.schema')
const jwt = require('jsonwebtoken')

const loginModule = async(req, res) => {
    try {
        const { username, password } = req.body
        const isUserExist = await User.findOne({ sName: username, sPassword: createHash(password) })

        if(!isUserExist){
            return messaging(res, statuscode.statusSuccess, 'Username is not exists')
        }

        const token = jwt.sign({ id: isUserExist._id, role: isUserExist.sRole }, config.app.secret_key, { expiresIn: config.app.expireIn })
        return messaging(res, statuscode.statusSuccess, token)
    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
    
}

module.exports = {
    loginModule
}