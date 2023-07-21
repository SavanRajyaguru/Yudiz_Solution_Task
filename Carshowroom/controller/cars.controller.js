const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
// const Cars = require('../schemas/cars.schema')
// const Brand = require('../schemas/brand.schema')
const { Car, Brand } = require('../sequelize_models/index')

const insertCarsDetails = async (req, res) => {
    try {
        // const { name, modelNumber, brandId, price } = req.body

        // const isBrand = await Brand.findOne({ _id: brandId })

        // if(!isBrand){
        //     return messaging(res, statuscode.statusSuccess, 'Brand not found!!')
        // }

        // const carsObj = {
        //     sCarName: name,
        //     nCarModel: modelNumber,
        //     iBrand_id: brandId._id,
        //     nPrice: price
        // }

        // await Cars.create(carsObj)
        //     .then((result) => {
        //         return messaging(res, statuscode.statusSuccess, result)
        //     }).catch((err) => {
        //         return messaging(res, statuscode.statusSuccess, err._message)
        //     })

        //* Sequelize code...
        const isBrandExist = await Brand.findOne({ where: { id: req.body.brandId } })
        console.log(isBrandExist)
        if (!isBrandExist) return messaging(res, statuscode.statusSuccess, 'Brand not exist')
        
        const isCar = await Car.create(req.body)
        return messaging(res, statuscode.statusSuccess, isCar)

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = { 
    insertCarsDetails    
}