const Sequelize = require('sequelize')
const { sequelize } = require('../database/mysql_db_connect')

const Car = sequelize.define('cars', {
    sCarName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nCarModel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 77777 
    },
    brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'brands',
            key: 'id',
        }
    },
    dPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
})

Car.sync()

module.exports = Car