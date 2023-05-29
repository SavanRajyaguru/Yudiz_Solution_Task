const mongoose = require('mongoose')
const config = require('../../config/config')

const dbConnect = async () => {
    await mongoose.connect(config.app.carDBUrl)
    .then((result) => console.log('Carshowroom DB connect at', result.connection.host))
    .catch((err) => console.log('Carshowroom DB connect error', err))
}

module.exports = dbConnect