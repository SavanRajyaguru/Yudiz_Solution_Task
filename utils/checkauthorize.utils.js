let jsonData = require('../database/userdata.json')
const { statuscode, messages } = require("./messages.utils")
const { messaging } = require("./messaging.utils")


//============= Authorize Admin ===========//
const isAuthorizedAdmin = (req, res, next) => {
    const admin = jsonData.find(item => item.id === req.decoded.id)

    if (!admin) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'admin'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}


//=============== Authorize User ==========//
const isAuthorizedUser = (req, res, next) => {
    const user = jsonData.find(item => item.id === req.decoded.id)

    if (!user) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'user'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}

module.exports = { isAuthorizedAdmin, isAuthorizedUser }