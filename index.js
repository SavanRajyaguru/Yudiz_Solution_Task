require('dotenv').config();
const express = require('express');
const app = express();
const loginData = require('./V1/routes/login.routes');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/login', loginData);

// If there is an error on all routes then default all 
app.all('*', (req, res) => {
    res.status(404).send("<h1>Data Not Found</h1>")
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error on listen", err);
    }
    console.log(`Server is running on ${process.env.PORT}...`);
})