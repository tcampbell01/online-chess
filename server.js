const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const redisClient = require("./config/redis");

dotenv.config()

const app = express()

db.connect((err) => {
    if(err){
        console.log(err);
        process.exit(1);
    }

    console.log("Connected to MySQL Database...")
})

app.get("/", (req,res) => {
    res.send("<h1>Hello from express ()</h1")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server started at http://localhost:${PORT}`))

