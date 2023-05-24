const mongoose = require('mongoose')

const uesrSchemas = mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: [true, 'Please add a id'],
    // },
    username: {
        type: String,
        required: [true, 'Please add a username'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    // role: {
    //     type: String,
    //     required: [true, 'Please add a role'],
    // }
})

const Users = mongoose.model('Users', uesrSchemas)

module.exports = Users