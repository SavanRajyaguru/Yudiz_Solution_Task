const express = require('express')
const connectDb = require('./database/database')
const transRoutes = require('./routes/transaction.routes')
const logger = require('morgan')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

connectDb()

app.use('/api', transRoutes)

app.all('*', (req, res) => {
    res.status(404).send('<h1>Data Not Found</h1>')
})

app.listen(6000, (err) => {
    if (err) {
        console.log('Error on listen', err)
    }
    console.log('Server is running on 6000...')
})