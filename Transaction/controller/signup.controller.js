const mongoose = require('mongoose')
const createHash = require('../../utils/createhash.utils')
const User = require('../schema/user.schema')
const Wallet = require('../schema/wallet.schema')
const Passbook = require('../schema/passbook.schema')

const userSignup = async (req, res) => {
    const session = await mongoose.startSession()
    try {

        //* transaction option
        const transactionOption = {
            readPreference: 'primary',
            readConcern: { level: 'majority' },
            writeConcern: { w: 'majority' }
        }

        const { sUsername, password, nAmount } = req.body

        //* check if user is exist or not
        const isUserExist = await User.findOne({ sUsername: sUsername })
        if(isUserExist){
            return res.status(200).json({message: 'User already exist'})
        }

        //* start transaction
        await session.startTransaction(transactionOption)
        console.log('========start')


        //* wallet created
        console.log('========wallet')
        const walletObj = {
            nAmount
        }
        const walletId = await Wallet.create([walletObj], { session })
        console.log(walletId)

        //* passbook created
        console.log('========passbook')
        const accountNumber = Math.floor((100000+Math.random()*1000000000000))
        const passbookObj = {
            accountNumber,
            sBranchName: 'AH SBI',
            iWalletId: walletId[0]._id
        }
        console.log(passbookObj)
        const passbookId = await Passbook.create([passbookObj], { session })

        //* user created
        console.log('========user')
        const sPassword = createHash(password)
        const userObj = {
            sUsername,
            sPassword,
            nAmount,
            iPassbook: passbookId[0]._id
        }
        console.log(userObj)
        await User.create([userObj], { session })

        //* commit transaction
        await session.commitTransaction()
        return res.status(200).json({message: 'Sign Up Successful'})

    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return res.status(500).json({message: 'Sign Up failed!! '})
    } finally {
        await session.endSession()
    }
}

module.exports = {
    userSignup,
    // userSignupAccount
}