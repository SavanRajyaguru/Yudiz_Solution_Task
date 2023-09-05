const mongoose = require('mongoose'), Schema = mongoose.Schema
const User = new Schema({
    name: {
        type: String,
        require: [true, 'Enter album name']
    },
    pass: {
        type: String,
    },
})

const user = mongoose.model('users', User);
module.exports = user