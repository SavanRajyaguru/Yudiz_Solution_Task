const { userSignup } = require('../controller/signup.controller')
const { manualTransaction, manualTransactionError, autoTransaction, transientTransactionError } = require('../controller/transaction.controller')

const router = require('express').Router()

router
    .post('/manual-transaction', manualTransaction)
    .post('/manual-transaction-error', manualTransactionError)
    .post('/auto-transaction', autoTransaction)
    .post('/signup', userSignup)
    .post('/transient-error', transientTransactionError)
module.exports = router