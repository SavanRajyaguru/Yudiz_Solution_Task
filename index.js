const express = require('express');
const app = express();
const logger = require('morgan');
const config = require('./config/config');
const versionOne = require('./V1/routes/v1.routes');
const versionTwo = require('./V1/routes/v2.routes');
const authWithJWT = require('./JWT_Demo/routes/authentication.routes')
const helthCheck = require('./helthcheck.routes');

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* helthcheck route
app.use('/helthcheck', helthCheck);

//* v1 task
app.use('/v1/login', versionOne);

//* v2 task
app.use('/v2/login', versionTwo);

//* JWT task
app.use('/auth', authWithJWT);


//! for the test only
// app.get('/test/:id', (req, res) => res.end(`Test with params ${req.params.id}`))
// app.post('/test', (req, res) => res.end("Test without params"))


//* If there is an error on all routes then default all 
app.all('*', (req, res) => {
    res.status(404).send("<h1>Data Not Found</h1>")
})

app.listen(config.app.port, (err) => {
    if (err) {
        console.log("Error on listen", err);
    }
    console.log(`Server is running on ${process.env.PORT}...`);
})