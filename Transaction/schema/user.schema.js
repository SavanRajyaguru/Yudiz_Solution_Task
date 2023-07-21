const mongoose = require('mongoose'), Schema = mongoose.Schema

const user = Schema({
    sUsername: {
        type: String,
        required: [true, 'Enter username']
    }, 
    sPassword: {
        type: String,
        required: [true, 'Enter password']
    },
    nAmount: {
        type: Number,
        required: [true, 'Enter Total Amount']
    },
    iPassbook: {
        type: Schema.Types.ObjectId,
        ref: 'passbook',
        required: [true, 'Enter passbook Id']
    }
}, { timestamps: false })

const User = mongoose.model('users', user)

module.exports = User