const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    sBrandName: {
        type: String,
        unique: true,
        enum: ['Tata', 'Kia', 'Mahindra', 'Hyundai', 'Lamborghini', 'Aston Martin'],
        require: [true, 'Please enter brand name']
    }
}, { timestamps: false })

const Brand = mongoose.model('brands', brandSchema)

module.exports = Brand