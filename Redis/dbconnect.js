const Redis = require('ioredis')
const config = require('../config/config')
const { handleCatchError } = require('../utils/utils.services')
const mongoose = require('mongoose'), Schema = mongoose.Schema

const cachegoose = require('recachegoose');
cachegoose(mongoose, {
    engine: 'redis',
    port: 6379,
    host: '127.0.0.1',
});

const redisClient = new Redis({
    // host: config.app.REDIS_HOST,
    // port: config.app.REDIS_PORT,
    // password: config.app.REDIS_PASSWORD
})

// const subscribe = new Redis({
//     host: config.app.REDIS_HOST,
//     port: config.app.REDIS_PORT,
//     password: config.app.REDIS_PASSWORD
// })

redisClient.on('error', function (error) {
    console.log('Error in Redis', error)
    process.exit(1)
})

redisClient.on('connect', function () {
    console.log('redis client connected')
})


// subscribe.on('connect', function () {
//     console.log('Subscribe connect');
// })

// subscribe.on('error', function (error) {
//     console.log('Error in Redis', error)
//     process.exit(1)
// })

// async function subscriber() {
//     try {
//         subscribe.subscribe('myChannel');

//         subscribe.on('message', (channel, message) => {
//             console.log(`Received message from channel ${channel}: ${message}`);
//         })

//     } catch (error) {
//         handleCatchError(error, 'subscribe')
//     }
// }

module.exports = {
    redisClient,
    cachegoose,
    checkRateLimit: async function (threshold, path, ip) {
        try {
            const ipLimit = await redisClient.incr(`${path}:${ip}`)
            if (ipLimit > threshold) {
                return 'LIMIT_REACHED'
            } else {
                const ttl = await redisClient.ttl(`${path}:${ip}`)
                console.log('TTL>>>', ttl);
                if (ttl === -1) {
                    await redisClient.expire(`${path}:${ip}`, 1800)
                }
                // return next()
                return
            }
        } catch (error) {
            handleCatchError(error, 'checkRateLimit.redis')
        }
    },
    getRateLimitData: async function (path, ip) {
        try {
            const data = await redisClient.get(`${path}:${ip}`)
            return data
        } catch (error) {
            handleCatchError(error, 'getRateLimitData.redis')
        }
    }
}