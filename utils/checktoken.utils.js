const jwt = require('jsonwebtoken')
const { messaging } = require('./messaging.utils')
const { messages, statuscode } = require('./messages.utils')
const config = require('../config/config')

const authToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if (!token) {
            return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
        }

        jwt.verify(token, config.app.secret_key, (err, decoded) => {
            if (err) {
                return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
            }

            req.decoded = decoded

            next()
        })
    } catch (error) {
        console.log('Checktoken utils', error)
        return messaging(res, statuscode.pageNotFound, messages.catch)
    }
}

module.exports = { authToken }