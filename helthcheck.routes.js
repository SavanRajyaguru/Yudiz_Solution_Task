const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

	const helthCheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	}

	try {
		return res.send(helthCheck)
	} catch (error) {
		helthCheck.message = error
		return res.status(503).send()
	}

})

module.exports = router