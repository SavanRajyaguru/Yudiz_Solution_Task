require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_Username,
    process.env.DB_Password,
    {
        host: process.env.DB_Host,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database: ', error)
})

//* for the export model 
// const db = require('../model/index')(sequelize, Sequelize)

module.exports = { sequelize }