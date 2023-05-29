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
        const { username, sellername, carname, qty } = req.body

        const user = await User.findOne({ sName: username })
        const seller = await Seller.findOne({ sName: sellername })
        const car = await Cars.findOne({ sCarName: carname })


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
                qty: qty
            }
        }
        const isValid = await transaction.create(transObj)
        if(isValid){

            //* update users cars count
            const isUserUpdate = await User.updateOne(
                { sName: username },
                { $push: { aCars: { carId: car._id, cName: carname, qty: qty } } }
            )

            if(isUserUpdate){
                return messaging(res, statuscode.statusSuccess, 'Transaction Successful')
            } else {
                //* update seller car count from database
                const isSuccess = await Seller.updateOne(
                    { 'aCars': { $elemMatch: { carsId: car._id } } },
                    { $inc: { 'aCars.$.qty': -qty } })
                if(isSuccess){
                    return messaging(res, statuscode.statusSuccess, 'Transaction Successful')
                } else {
                    return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
                }
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