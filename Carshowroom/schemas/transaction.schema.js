const mongoose = require('mongoose'), Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'sellers'
    },
    sCity: {
        type: String,
        require: [true, 'City is require']
    },
    carDetails: {
        carId: {
            type: Schema.Types.ObjectId,
            ref: 'cars'
        },
        qty: {
            type: Number,
        },
        nTotalPrice: {
            type: Number,
        }
    }
}, { timestamps: true })
const transaction = mongoose.model('transaction', transactionSchema)

module.exports = transaction