const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const Seller = require('../schemas/sellers.schema')
const User = require('../schemas/users.schema')

const isMatchedCity = async(req, res, next) => {
    try {
        const { userId, sellerId } = req.body
        const sellerCity = await Seller.findOne({ _id: sellerId })
        const userCity = await User.findOne({ _id: userId })

        //* if seller is not found
        if(!sellerCity){
            return messaging(res, statuscode.statusSuccess, 'Seller is not found!')
        }

        //* if user is not found
        if(!userCity){
            return messaging(res, statuscode.statusSuccess, 'User is not found!')
        }

        return sellerCity.sCity === userCity.sCity 
            ? next()
            : messaging(res, statuscode.statusNotFound, 'Seller or city is does not match')

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, 'Error in middleware')
    }
}

module.exports = {
    isMatchedCity
}