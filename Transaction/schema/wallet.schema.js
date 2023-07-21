const mongoose = require('mongoose'), Schema = mongoose.Schema

const wallet = Schema({
    nAmount: {
        type: Number,
        required: [true, 'Enter amount']
    },
}, { timestamps: true })

const Wallet = mongoose.model('wallet', wallet)

module.exports = Wallet