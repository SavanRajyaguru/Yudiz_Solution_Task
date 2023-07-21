const createHash = require('../../utils/createhash.utils')
const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const { sequelize } = require('../database/mysql_db_connect')
// const Cars = require('../schemas/cars.schema')
// const Seller = require('../schemas/sellers.schema')
// const transaction = require('../schemas/transaction.schema')
// const User = require('../schemas/users.schema')
const { User, Seller, Car, UserCar, Transaction, Brand } = require('../sequelize_models/index')

const insetUserDetails = async (req, res) => {
    try {
        // const { username, password, city } = req.body
        // const isUserExist = await User.findOne({ sName: username })

        // if(isUserExist){
        //     return messaging(res, statuscode.statusSuccess, 'Username is already exists')
        // }

        // await User.create(
        //     { sName: username, sRole: role, sCity: city, sPassword: createHash(password) })
        //     .then((result) => {
        //         return messaging(res, statuscode.statusSuccess, result)
        //     }).catch((err) => {
        //         return messaging(res, statuscode.statusSuccess, err._message)
        //     })

        //* Sequelize code...
        const isUserExist = await User.findOne({ where: { sUsername: req.body.sUsername } })
        if (!isUserExist) return messaging(res, statuscode.statusSuccess, 'User already exists')
        
        req.body.sPassword = createHash(req.body.sPassword)
        const isUser = await User.create(req.body)
        return messaging(res, statuscode.statusSuccess, isUser)

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

const insertBuysCar = async(req, res) => {
    try {

        //* Sequelize code...
        const { userId, sellerId, carId } = req.body

        const isUserExist = await User.findOne({ where: { id: userId } })
        if (!isUserExist) return messaging(res, statuscode.statusSuccess, 'User not exists')

        const isSellerExist = await Seller.findOne(
            {
                where: { id: sellerId },
                include: [
                    {
                        model: Car,
                        attributes: ['id', 'sCarName', 'dPrice', 'nCarModel'],
                        through: {
                            attributes: []
                        },
                        where: {
                            id: carId
                        }
                    }
                ]
            }
        )
        // console.log(isSellerExist)
        if (isSellerExist?.dataValues === undefined) return messaging(res, statuscode.statusSuccess, 'Seller or car not exists')
        console.log(isSellerExist.cars[0].getDataValue('dPrice'))

        const isCarExist = await Car.findOne({ where: { id: carId } })
        if (!isCarExist) return messaging(res, statuscode.statusSuccess, 'Car not exists')

        if (isUserExist.getDataValue('sCity') !== isSellerExist.getDataValue('sCity')) { 
            return messaging(res, statuscode.statusSuccess, 'City does not match')
        }

        await UserCar.create({ userId: userId, carId: carId })

        const isSuccess = await Transaction.create({ 
            userId: userId,
            sellerId: sellerId,
            carId: carId,
            dPrice: isSellerExist.cars[0].getDataValue('dPrice')
        })

        if(isSuccess) return messaging(res, statuscode.statusSuccess, 'Transaction Success true')
        
        return messaging(res, statuscode.statusSuccess, isSellerExist)
        


        // const { userId, sellerId, carId, qty } = req.body

        // const user = await User.findOne({ _id: userId })
        // const seller = await Seller.findOne({ _id: sellerId })
        // const car = await Cars.findOne({ _id: carId })

        // //* if car is not found
        // if(!car){
        //     return messaging(res, statuscode.statusSuccess, 'Car is not found!')
        // }

        // const transObj = {
        //     userId: user._id,
        //     sellerId: seller._id,
        //     sCity: user.sCity,
        //     carDetails: {
        //         carId: car._id,
        //         qty: qty,
        //         nTotalPrice: qty * car.nPrice
        //     }
        // }
        
        // if(car){

        //     //* update users cars count
        //     const isUserUpdate = await User.updateOne(
        //         { _id: userId, 'aCars': { $elemMatch: { carId: car._id }} },
        //         { $inc: { 'aCars.$.qty': qty } }
        //     )

        //     if(!isUserUpdate.modifiedCount){
        //         //* when car is not exists 
        //         const isNewCar = await User.updateOne(
        //             { _id: userId },
        //             { $push: { aCars: { carId: car._id, cName: car.sCarName, qty: qty } } }
        //         )
        //         if(!isNewCar.modifiedCount){
        //             return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
        //         } 
        //     }
        //         //* update seller car count from database
        //         const isSellerUpdate = await Seller.updateOne(
        //             { _id: sellerId, 'aCars': { $elemMatch: { carsId: car._id } } },
        //             { $inc: { 'aCars.$.qty': -qty } })

        //         if(isUserUpdate.modifiedCount && isSellerUpdate.modifiedCount){
        //             const isSuccess = await transaction.create(transObj)
                    
        //             if(isSuccess){
        //                 return messaging(res, statuscode.statusSuccess, 'Transaction Successful')
        //             }

        //             return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
        //         } else {
        //             return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')
        //         }
            
        // }
        // return messaging(res, statuscode.statusSuccess, 'Transaction Unsuccessful')

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

//* Sequelize code...
const showDetails = async (req, res) => {
    try {
        // a) How many cars are sold in total
        // b) In which city cars are most sold
        // c) Which car is sold the most
        // d) Which Brand's cars are most sold
        //* query fullFill all the above query

        const totalCarSold = await Transaction.findOne({
            attributes: [
                [sequelize.fn('count', '*'), 'TotalSoldCar']
            ],
        })
        // console.log(totalCarSold)

        const cityMostSold = await Transaction.findOne({
            attributes: [
                'seller.sCity',
                [sequelize.fn('count', sequelize.col('carId')), 'Most_car_sold']
            ],
            include: [
                {
                    model: Seller,
                    attributes: [
                        'sCity'
                    ],
                    
                }
            ],
            group: ['seller.sCity'],
            order: [
                [sequelize.fn('count', sequelize.col('carId')), 'DESC']
            ],
        })
        
        const dataOfCars = await Transaction.findOne({
            attributes: [
                'carId',
                [sequelize.fn('count', sequelize.col('carId')), 'Car_Count']
            ],
            include: [
                {
                    model: Car,
                    attributes: ['id', 'sCarName', 'brandId'],
                    include: [
                        {
                            model: Brand,
                            attributes: ['sBrandName'],
                            // separate: true
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['id', 'sUserName', 'sCity']
                }
            ],
            group: ['carId'],
            order: [
                [sequelize.fn('count', sequelize.col('carId')), 'DESC']
            ],
        })

        const requiredData = {
            TotalCarSold: totalCarSold.getDataValue('TotalSoldCar'),
            City: cityMostSold,
            CarsData: dataOfCars
        }
        // console.log(dataOfCars)
        return messaging(res, statuscode.statusSuccess, requiredData)
    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = { 
    insetUserDetails,
    insertBuysCar,
    showDetails
}