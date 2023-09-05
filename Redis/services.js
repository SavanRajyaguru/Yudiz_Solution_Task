const { handleCatchError } = require("../utils/utils.services");
const { checkRateLimit, getRateLimitData, redisClient, cachegoose } = require("./dbconnect");
const user = require('./model')

class RedisTest {
    async rateLimit(req, res) {
        try {
            console.log(req.path, req.connection.remoteAddress);
            const store = await checkRateLimit(5, req.path, req.connection.remoteAddress)
            console.log('Store>>', store);
            const data = await getRateLimitData(req.path, req.connection.remoteAddress)
            console.log('Data>>>', data);
            return res.status(200).json({
                data: 'data',
            })
        } catch (error) {
            handleCatchError(error, 'RedisTest.rateLimit')
            return res.status(404).json({
                message: 'Not found!!',
                error: error
            })
        }
    }

    async testCache(req, res) {
        try {
            // const data1 = await redisClient.get('cacheman:cachegoose-cache:data:user')
            // console.log(data1)
            const data = await user.find().cache('data:user')
            // const key = 'list:user'

            // redisClient.lpush(key, data)
            // const demodata = await redisClient.lrange(key, 0, 2)
            // console.log('data', demodata);
            return res.status(200).json({
                message: 'Success',
                data: data
            })

        } catch (error) {
            handleCatchError(error, 'RedisTest.rateLimit')
            return res.status(404).json({
                message: 'Not found!!',
                error: error
            })
        }
    }
}

module.exports = new RedisTest()