// You will have to make every function that uses the redisClient now async
// If the redisClient is used inside mysql callback function then you will have to make this callback async
// Ex. const query = "SELECT * FROM mytable"
//     db.query(query, async (err, result) => {...})
const redis = require("redis");

// Your redis instance must be running on port 6379
const redisClient = redis.createClient();

const connectToRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = {connectToRedis, redisClient};