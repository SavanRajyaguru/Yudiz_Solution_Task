const mongoose = require('mongoose'), Schema = mongoose.Schema

const passbook = Schema({
    accountNumber: {
        type: Number,
        required: [true, 'Enter username']
    }, 
    sBranchName: {
        type: String,
        required: [true, 'Enter password']
    },
    iWalletId: {
        type: Schema.Types.ObjectId,
        ref: 'wallet',
        required: [true, 'Enter wallet Id']
    }
}, { timestamps: true })

const Passbook = mongoose.model('passbook', passbook)

module.exports = Passbook