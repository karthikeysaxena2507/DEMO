const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const redisClient = redis.createClient(process.env.REDIS_URL, {
    no_ready_check: true,
    auth_pass: process.env.REDIS_PASSWORD
});

redisClient.on("connect", (err) => {
    if(err) console.log(err);    
    else console.log("Redis cluster connected Successfully");    
});

const printAllTokens = () => {
    redisClient.keys("*", (err, keys) => {
        if(err) console.log(err);
        else 
        {
            keys.map((key) => {
                redisClient.get(key, (err, value) => {
                    if(err) console.log(err);
                    else console.log("Key => ", key , "VALUE => ", value);
                });
            })
        }
    });
};

const deleteAllTokens = () => {
    redisClient.flushall((err, res) => {
        if(err) console.log(err);
        else  console.log(res);
    });
}

const deleteToken = (token) => {
    redisClient.del(token, (err, response) => {
        if(err) console.log(err);
        else console.log(response);
    });
}

const setAccessToken = (token, value) => {
    redisClient.setex(token, 600, value);
}

const setRefreshToken = (token) => {
    redisClient.setex(token, 3600, "1");
}

const getRefreshTokenFromAccessToken = async(accessToken) => {
    const refreshToken = await redisClient.getAsync(accessToken);
    return refreshToken;
}

module.exports = { 
    printAllTokens,
    deleteAllTokens,
    deleteToken,
    setAccessToken,
    setRefreshToken,
    getRefreshTokenFromAccessToken
};