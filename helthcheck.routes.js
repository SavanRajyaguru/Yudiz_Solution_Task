const express = require('express');
const { authToken } = require('./utils/checktoken.utils');
const { isAuthorizedAdmin } = require('./utils/checkauthorize.utils');
const router = express.Router();

router.get('/', authToken, isAuthorizedAdmin, async (req, res, next) => {

    const helthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }

    try {
        return res.send(helthCheck);
    } catch (error) {
        helthCheck.message = error;
        return res.status(503).send();
    }

})

module.exports = router;