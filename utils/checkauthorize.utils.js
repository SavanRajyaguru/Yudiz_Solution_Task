const { statuscode, messages } = require('./messages.utils')
const { messaging } = require('./messaging.utils')
const Users = require('../schemas/user.schemas')


//============= Authorize Admin ===========//
const isAuthorizedAdmin = async (req, res, next) => {
    // const admin = jsonData.find(item => item.id === req.decoded.id)

    const admin = await Users.findOne({ _id: req.decoded.id })
    if (!admin) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'admin'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}


//=============== Authorize User ==========//
const isAuthorizedUser = async (req, res, next) => {
    const user = await Users.findOne({ _id: req.decoded.id })

    if (!user) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'user'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}

module.exports = { isAuthorizedAdmin, isAuthorizedUser }