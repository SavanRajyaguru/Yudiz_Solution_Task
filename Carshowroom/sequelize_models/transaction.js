const Sequelize = require('sequelize')
const { sequelize } = require('../database/mysql_db_connect')

const Transaction = sequelize.define('transaction', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sellers',
            key: 'id',
        }
    },
    carId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cars',
            key: 'id',
        }
    },
    dPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Transaction.sync()

module.exports = Transaction