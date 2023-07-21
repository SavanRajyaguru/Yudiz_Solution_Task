const { sequelize } = require('../database/mysql_db_connect')
const Sequelize = require('sequelize') 

const SellerCar = sequelize.define('sellers_car', {
    carId: {
        type: Sequelize.INTEGER,
    },
    sellerId: {
        type: Sequelize.INTEGER,
    }
})
SellerCar.sync()

module.exports = SellerCar