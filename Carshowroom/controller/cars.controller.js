const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const Cars = require('../schemas/cars.schema')
const Brand = require('../schemas/brand.schema')

const insertCarsDetails = async (req, res) => {
    try {
        const { name, modelNumber, brand } = req.body

        const brandId = await Brand.findOne({ sBrandName: brand })

        if(!brandId){
            return messaging(res, statuscode.statusSuccess, 'Brand not found!!')
        }

        const carsObj = {
            sCarName: name,
            nCarModel: modelNumber,
            iBrand_id: brandId._id
        }

        await Cars.create(carsObj)
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
    insertCarsDetails    
}