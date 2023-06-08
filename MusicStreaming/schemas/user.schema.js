const mongoose = require('mongoose'), Schema = mongoose.Schema

const UserSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Enter username name']
    },
    sPassword: {
        type: String,
        require: [true, 'Enter password']
    },    
})

const User = mongoose.model('user', UserSchema)

module.exports = User