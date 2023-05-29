const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const Cars = require('../schemas/cars.schema')
const Seller = require('../schemas/sellers.schema')

//* insert Seller Details
const insertSellerDetails = async (req, res) => {
    try {
        const { sellername, city, cars } = req.body

        const sellerObj = {
            sName: sellername,
            sCity: city,
            aCars: []
        }

        for(let car of cars){
            const carId = await Cars.findOne({ sCarName: car.name })
            
            if(!carId){
                return messaging(res, statuscode.statusSuccess, `${car.name} not found on cars!!`)
            }

            const carsObj = {
                carsId: carId._id,
                qty: car.qty
            }
            sellerObj.aCars.push(carsObj)
        }

        console.log(sellerObj) 

        await Seller.create(sellerObj)
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


//* Add more cars in storage
const insertCars = async (req, res) => {
    try {
        const { sellername, cars } = req.body

        //* seller authentication
        const isSeller = await Seller.findOne({ sName: sellername })
        
        if(!isSeller){
            return messaging(res, statuscode.statusSuccess, 'Enter valid seller name')
        }

        const carArray = []

        for(let car of cars){
            const carId = await Cars.findOne({ sCarName: car.name })
            
            if(!carId){
                return messaging(res, statuscode.statusSuccess, `${car.name} not found on cars!!`)
            }

            //* find the qty of existing cars 
            const isCar = await Seller.updateOne(
                { sName: sellername, 'aCars': { $elemMatch: { carsId: carId._id }} }, 
                { $inc: { 'aCars.$.qty': car.qty } })
            
            console.log('IS CAR>>>>>>',isCar)
            if(!isCar.modifiedCount){
                const carsObj = {
                    carsId: carId._id,
                    qty: car.qty 
                }
                carArray.push(carsObj)
            }
        }

        await Seller.updateOne({ sName: sellername }, { $push: { aCars: { $each: carArray } } })
            .then(() => {
                return messaging(res, statuscode.statusSuccess, 'Inserted Successfully')
            }).catch((err) => {
                return messaging(res, statuscode.statusSuccess, err._message)
            })

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = { 
    insertSellerDetails,
    insertCars    
}