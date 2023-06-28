"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisUrl = 'redis://localhost:6379';
const redisClient = (0, redis_1.createClient)({
    url: redisUrl,
});
const connectRedis = async () => {
    try {
        await redisClient.connect();
        // console.log('Redis client connect successfully');
        redisClient.set('try', 'Hello Welcome to Express with TypeORM');
    }
    catch (error) {
        // console.log(error);
        setTimeout(connectRedis, 50000000000);
    }
};
connectRedis();
exports.default = redisClient;
//# sourceMappingURL=connect.redis.js.map