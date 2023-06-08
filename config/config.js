require('dotenv').config()

// SET NODE_ENV=development
// for the env 
// const env = process.env.NODE_ENV; // 'dev' or 'test'

const config = {
    app: {
        port: process.env.PORT || 4040,
        secret_key: process.env.SECRET_KEY || 'crash',
        expireIn: '1h',
        DB_URL: process.env.DB_URL || '',
        carDBUrl: process.env.CARSDB_URL || '',
    }
}

module.exports = config