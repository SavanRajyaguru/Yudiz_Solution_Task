const router = require('express').Router()
const { isAuthorizedAdmin } = require('../utils/checkauthorize.utils')
const { authToken } = require('../utils/checktoken.utils')
const { adminAccessData } = require('./controller/admin.controller')
const { loginModule } = require('./controller/login.controller')
const connect = require('./database/dbconnect')
const brandRoute = require('./routes/brand.routes')
const carsRoute = require('./routes/cars.routes')
const sellerRoute = require('./routes/seller.routes')
const userRoute = require('./routes/user.routes')

//* connect function for the DB
connect()

//* admin Route
router.use('/admin', authToken, isAuthorizedAdmin, adminAccessData)

//* Login Route
router.use('/login', loginModule)

//* brand routes 
router.use('/brand', brandRoute)

//* cars routes
router.use('/cars', carsRoute)

//* seller routes
router.use('/seller', sellerRoute)

//* user routes
router.use('/user', userRoute)

module.exports = router