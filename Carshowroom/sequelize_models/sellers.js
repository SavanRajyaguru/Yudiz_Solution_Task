const Sequelize = require('sequelize')
const { sequelize } = require('../database/mysql_db_connect')

const Seller = sequelize.define('sellers', {
    sUsername: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    sPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sCity: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Seller.sync()

module.exports = Seller