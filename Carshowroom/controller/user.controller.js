const createHash = require('../../utils/createhash.utils')
const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const Cars = require('../schemas/cars.schema')
const Seller = require('../schemas/sellers.schema')
const transaction = require('../schemas/transaction.schema')
const User = require('../schemas/users.schema')

const insetUserDetails = async (req, res) => {
    try {
        const { username, password, city, role } = req.body
        const isUserExist = await User.findOne({ sName: username })

        if(isUserExist){
            return messaging(res, statuscode.statusSuccess, 'Username is already exists')
        }

        await User.create(
            { sName: username, sRole: role, sCity: city, sPassword: createHash(password) })
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

const insertBuysCar = async(req, res) => {
    try {
        const { userId, sellerId, carId, qty } = req.body

        const user = await User.findOne({ _id: userId })
        const seller = await Seller.findOne({ _id: sellerId })
        const car = await Cars.findOne({ _id: carId })

        //* if car is not found
        if(!car){
            return messaging(res, statuscode.statusSuccess, 'Car is not found!')
        }

        const transObj = {
            userId: user._id,
            sellerId: seller._id,
            sCity: user.sCity,
            carDetails: {
                carId: car._id,
                qty: qty,
                nTotalPrice: qty * car.nPrice
            }
        }
        
        if(car){

            //* update users cars count
            const isUserUpdate = await User.updateOne(
                { _id: userId, 'aCars': { $elemMatch: { carId: car._id }} },
                { $inc: { 'aCars.$.qty': qty } }
            )

            if(!isUserUpdate.modifiedCount){
                //* when car is not exists 
                const isNewCar = await User.updateOne(
                    { _id: userId },
                    { $push: { aCars: { carId: car._id, cName: car.sCarName, qty: qty } } }
                )
                if(!isNewCar.modifiedCount){
                    return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
                } 
            }
                //* update seller car count from database
                const isSellerUpdate = await Seller.updateOne(
                    { _id: sellerId, 'aCars': { $elemMatch: { carsId: car._id } } },
                    { $inc: { 'aCars.$.qty': -qty } })

                if(isUserUpdate.modifiedCount && isSellerUpdate.modifiedCount){
                    const isSuccess = await transaction.create(transObj)
                    
                    if(isSuccess){
                        return messaging(res, statuscode.statusSuccess, 'Transaction Successful')
                    }

                    return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
                } else {
                    return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
                }
            
        }
        return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = { 
    insetUserDetails,
    insertBuysCar    
}