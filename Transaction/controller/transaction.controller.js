const mongoose = require('mongoose')
const User = require('../schema/user.schema')
// const connectDb = require('../database/database')
const Transaction = require('../schema/transaction.schema')


//* p1 : transfer x amount from user a and credit to user b 
//* (perform manual transaction)
const manualTransaction = async (req, res) => {
    //* start session
    const session = await mongoose.startSession()

    try {
        const { iDebit, iCredit, nAmount } = req.body

        // //* user check
        // const isUserExist = await User.find({ _id: { $in: [ iDebit, iCredit ] } })
        
        // isUserExist.forEach(ele => {
        //     if(ele._id.toString() != iDebit || ele._id.toString() != iCredit){
        //         return res.status(404).json({message: 'User not found'})
        //     }
        // })

        const isDebitUser = await User.findById(iDebit)
        const isCreditUser = await User.findById(iCredit)

        if(!isCreditUser || !isDebitUser){
            return res.status(404).json({message: 'User not found'})
        }

        //* transaction option
        const transactionOption = {
            readPreference: 'primary',
            retryWrites: true,
            readConcern: { level: 'majority' },
            writeConcern: { w: 'majority' }
        }
        
        //* start transaction
        await session.startTransaction(transactionOption)
        console.log('==========start')

        const debitAmount = Math.abs(isDebitUser.nAmount - nAmount)
        const isUpdateDebit = await User.updateOne({ _id: iDebit }, { nAmount: debitAmount }, { session })

        console.log('=======userA Debit', isUpdateDebit)

        const creditAmount = (isCreditUser.nAmount + nAmount)
        const isUpdateCredit = await User.updateOne({ _id: iCredit }, { nAmount: creditAmount }, { session })

        console.log('=======userB Credit', isUpdateCredit)


        const transactionObj = {
            iDebit,
            iCredit,
            nAmount
        }

        await Transaction.create([transactionObj], { session })

        //* commit transaction
        await session.commitTransaction()
        return res.status(200).json({message: 'Transaction successful'})
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return res.status(500).json({message: 'Transaction failed!! '})
    } finally {
        await session.endSession()
    }
}

//* p1 error 
const manualTransactionError = async (req, res) => {
    //* start session
    const session = await mongoose.startSession()

    try {
        const { iDebit, iCredit, nAmount } = req.body

        //* user check
        const isDebitUser = await User.findById(iDebit)
        const isCreditUser = await User.findById(iCredit)

        if(!isCreditUser || !isDebitUser){
            return res.status(404).json({message: 'User not found'})
        }
    
        //* start transaction
        await session.startTransaction()
        console.log('==========start')

        const debitAmount = Math.abs(isDebitUser.nAmount - nAmount)
        const isUpdateDebit = await User.updateOne({ _id: iDebit }, { nAmount: debitAmount }, { session })

        console.log('=======userA Debit', isUpdateDebit)

        const creditAmount = (isCreditUser.nAmount + nAmount)
        const isUpdateCredit = await User.updateOne({ _id: iCredit }, { nAmount: creditAmount }, { session })

        console.log('=======userB Credit', isUpdateCredit)


        const transactionObj = {
            // iDebit,
            // iCredit,
            // nAmount
        }

        await Transaction.create([transactionObj], { session })

        //* commit transaction
        await session.commitTransaction()
        return res.status(200).json({message: 'Transaction successful'})
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return res.status(500).json({message: 'Transaction failed!! '})
    } finally {
        session.endSession()
    }
}

//* - p2 : transfer x amount from user a and credit to user b 
//* (perform automatic transaction, using method)
const autoTransaction = async (req, res) => {
    //* start session
    const session = await mongoose.startSession()

    try {
        const { iDebit, iCredit, nAmount } = req.body

        //* user check
        const isDebitUser = await User.findById(iDebit)
        const isCreditUser = await User.findById(iCredit)

        if(!isCreditUser || !isDebitUser){
            return res.status(404).json({message: 'User not found'})
        }
    
        //* start transaction
        await session.withTransaction(async () => {
            console.log('==========start')

            const debitAmount = Math.abs(isDebitUser.nAmount - nAmount)
            const isUpdateDebit = await User.updateOne({ _id: iDebit }, { nAmount: debitAmount }, { session })

            console.log('=======userA Debit', isUpdateDebit)

            const creditAmount = (isCreditUser.nAmount + nAmount)
            const isUpdateCredit = await User.updateOne({ _id: iCredit }, { nAmount: creditAmount }, { session })

            console.log('=======userB Credit', isUpdateCredit)

            const transactionObj = {
                iDebit,
                iCredit,
                // nAmount
            }

            await Transaction.create([transactionObj], { session })
        })

        return res.status(200).json({message: 'Transaction successful'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Transaction failed!! '})
    } finally {
        session.endSession()
    }
}


//* TransientTransactionError paradigm.
const transientTransactionError = async (req, res) => {
    const session1 = await mongoose.startSession()
    const session2 = await mongoose.startSession()
    try {
        const { iDebit } = req.body

        //* start transaction
        session1.startTransaction()
        // await session2.startTransaction()

        const isUpdateDebit1 = await User.findByIdAndUpdate(iDebit, { $inc: { nAmount: 1 } }, { session: session1 , new: true} )
        console.log(isUpdateDebit1)
        // const isUpdateDebit2 = await User.findByIdAndUpdate(iDebit, { $inc: { nAmount: 1 } }, { session: session2 , new: true} )
        // console.log(isUpdateDebit2)

        await session1.commitTransaction()
        // await session2.commitTransaction()
        return res.status(200).json({message: 'Increment Successful'})


    } catch (error) {
        console.log(error)
        await session1.abortTransaction()
        // await session2.abortTransaction()
        return res.status(500).json({message: 'Transaction failed!! '})
    } finally {
        await session1.endSession()
        await session2.endSession()
    }
}


module.exports = {
    manualTransaction,
    manualTransactionError,
    autoTransaction,
    transientTransactionError
}