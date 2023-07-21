const Sequelize = require('sequelize')
const { sequelize } = require('../database/mysql_db_connect')

const User = sequelize.define('users', {
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
User.sync()

module.exports = User