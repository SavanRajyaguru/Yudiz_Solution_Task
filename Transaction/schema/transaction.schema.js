const mongoose = require('mongoose'), Schema = mongoose.Schema

const transaction = Schema({
    iDebit: {
        type: Schema.Types.ObjectId,
        required: [true, 'Enter debit Id']
    }, 
    iCredit: {
        type: Schema.Types.ObjectId,
        required: [true, 'Enter credit Id']
    },
    nAmount: {
        type: Number,
        required: [true, 'Enter amount']
    }
}, { timestamps: true })

const Transaction = mongoose.model('transaction', transaction)

module.exports = Transaction