const Sequelize = require('sequelize')
const { sequelize } = require('../database/mysql_db_connect')

const Brand = sequelize.define('brands', {
    sBrandName: {
        type: Sequelize.ENUM('Tata', 'Kia', 'Hyundai', 'Lamborghini', 'Aston Martin'),
        allowNull: false
    }
})
Brand.sync()

module.exports = Brand