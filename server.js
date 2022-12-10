require("dotenv").config();

const express = require("express");
const db = require("./config/db");
const {connectToRedis, redisClient} = require("./config/redis")
const path = require("path")

const main = async () => {
    const app = express();

    db.connect(err => {
        if(err) {
            console.error(err.message);
            process.exit(1);
        }

        console.log("Connected to MySQL Database...");
    })

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"))
    app.use(express.static(path.join(__dirname, "public")))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    app.get("/", (req, res) => {
        res.render("index")
    })

    await connectToRedis();

    // Previous way of getting values from redis
    // redisClient.get('my_key', (err, result) => {
    //     console.log('result');
    // })

    // How to retrieve values now
    // So you will have to make some changes to your code while following this tutorial
    // if you use the current version of redis npm package
    const value = await redisClient.get('my_key');
    console.log(value);

    // Similarly for set and delete
    await redisClient.set('my_key', 'my_val');
    await redisClient.del('my_key'); 

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

main();