const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const Brand = require('../schemas/brand.schema')

const insetBrandDetails = async (req, res) => {
    try {
        const { name } = req.body
        await Brand.create({sBrandName: name})
        .then((result) => {
            return messaging(res, statuscode.statusSuccess, result)
        }).catch((err) => {
            return messaging(res, statuscode.statusSuccess, err._message)
        })

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = { 
    insetBrandDetails    
}