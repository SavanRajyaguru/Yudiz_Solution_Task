const express = require('express')
const app = express()
const cors = require('cors')
// const cron = require('node-cron')
const logger = require('morgan')
// const connectDb = require('./database/dbconnect')
const config = require('./config/config')
// const versionOne = require('./V1/routes/v1.routes')
// const versionTwo = require('./V1/routes/v2.routes')
// const authWithJWT = require('./JWT_Demo/routes/authentication.routes')
const healthCheck = require('./helthcheck.routes')
// const languageDemo = require('./Internationalization/index')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* Connect test database
// connectDb()

//* healthcheck route
app.use('/healthcheck', healthCheck)

//* carshowroom task with Mongoose
const carRoutes = require('./Carshowroom')

//* GridFs demo
// app.use('/v1', require('./GridFS_Demo'))

//* mongoose demo
app.use('/api', carRoutes)

//* cron demo task
// cron.schedule('*/5 * * * * *', () => {
//     console.log(new Date().toUTCString().split(',')[1].trim().split(' ')[3])
// })

//* v1 task
// app.use('/v1/login', versionOne)

//* v2 task
// app.use('/v2/login', versionTwo)

//* JWT task
// app.use('/auth', authWithJWT)

//* Internationalization 
// app.use('/inter', languageDemo)

//! for the test only with ? and without ? before id
// app.get('/test/:id?', (req, res) => res.end(`Test with params ${req.params.id}`))
// app.get('/test', (req, res) => res.end("Test without params"))


//* If there is an error on all routes then default all 
app.all('*', (req, res) => {
    res.status(404).send('<h1>Data Not Found</h1>')
})

app.listen(config.app.port, (err) => {
    if (err) {
        console.log('Error on listen', err)
    }
    console.log(`Server is running on ${config.app.port}...`)
})