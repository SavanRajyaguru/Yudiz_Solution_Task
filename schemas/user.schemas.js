const mongoose = require('mongoose')

const uesrSchemas = mongoose.Schema({
    sUsername: {
        type: String,
        required: [true, 'Please add a username'],
    },
    sPassword: {
        type: String,
        required: [true, 'Please add a password'],
    },
    sRole: {
        type: String,
        required: [true, 'Please add a role'],
    }
})

const Users = mongoose.model('Users', uesrSchemas)

module.exports = Users