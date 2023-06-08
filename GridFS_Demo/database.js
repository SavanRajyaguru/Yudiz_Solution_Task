const mongoose = require('mongoose')
const config = require('../config/config')

const connect = async() => {
    try {
        await mongoose.connect(config.app.DB_URL)
        .then(res => console.log('DB Name:',res.connection.name))
        .catch(err => console.log('DB ERROR>>>>', err))
    } catch (error) {
        console.log('ERROR>>>>>>>',error)
    }
} 

module.exports = connect

