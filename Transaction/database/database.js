const mongoose = require('mongoose')

const url = 'mongodb+srv://savan:Savan%40123@nodeexpressproject.xawq19g.mongodb.net/test'

const connectDb = async () => {
    await mongoose.connect(url, { useNewUrlParser: true })
        .then(result => console.log('MongoDb connected', result.connection.db.namespace))
        .catch(err => console.log('DB ERROR>>>>', err))
}

module.exports = connectDb