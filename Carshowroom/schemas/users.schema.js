const mongoose = require('mongoose'), Schema = mongoose.Schema  

const userSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Name is required']
    },
    sCity: {
        type: String,
        require: [true, 'City is required']
    },
    sPassword: {
        type: String,
        require: [true, 'Password is require']
    },
    sRole: {
        type: String,
        require: [true, 'Role is require']
    },
    aCars: [
        {
            carId: {
                type: Schema.Types.ObjectId,
                ref: 'cars'
            },
            cName: String,
            qty: Number
        }
    ]
})

const User = mongoose.model('users', userSchema)

module.exports = User