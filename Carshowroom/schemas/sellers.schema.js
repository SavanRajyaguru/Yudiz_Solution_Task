const mongoose = require('mongoose'), Schema = mongoose.Schema

const sellerSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Seller Name is require']
    },
    sCity: {
        type: String,
        require: [true, 'City is require']
    },
    aCars: [
        {
            carsId: {
                type: Schema.Types.ObjectId,
                ref: 'cars'
            },
            qty: {
                type: Number,
                default: 1,
            }
        }
    ]
}, { timestamps: false })

const Seller = mongoose.model('sellers', sellerSchema)

module.exports = Seller