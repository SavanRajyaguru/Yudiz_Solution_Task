const { sequelize } = require('../database/mysql_db_connect')
const Sequelize = require('sequelize') 

const UserCar = sequelize.define('users_car', {
    carId: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
    }
})
UserCar.sync()

module.exports = UserCar