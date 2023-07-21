const Brand = require('./brand')
const User = require('./users')
const Car = require('./cars')
const Seller = require('./sellers')
const UserCar = require('./users_car')
const SellerCar = require('./sellers_car')
const Transaction = require('./transaction')

//* user side association
User.belongsToMany(Car, { through: 'users_car'})
Car.belongsToMany(User, { through: 'users_car' })

//* seller side association
Seller.belongsToMany(Car, { through: 'sellers_car' })
Car.belongsToMany(Seller, { through: 'sellers_car' })

//* car side 
Brand.hasMany(Car, { foreignKey: 'brandId', onDelete: 'CASCADE' })
Car.belongsTo(Brand)

//* Transaction
User.hasMany(Transaction, { foreignKey: 'userId' })
Transaction.belongsTo(User)

Car.hasMany(Transaction, { foreignKey: 'carId' })
Transaction.belongsTo(Car)

Seller.hasMany(Transaction, { foreignKey: 'sellerId' })
Transaction.belongsTo(Seller)

module.exports = {
    User,
    Seller,
    Brand,
    Car,
    Transaction,
    UserCar,
    SellerCar
}