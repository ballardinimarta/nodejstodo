const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/routes")
const bodyParser = require("body-parser")
require("dotenv").config();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false })) 

app.set("view engine", "ejs")

app.use("/", router)

mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return 
        app.listen(8000, ()=> {
        console.log("app is running ") 
    })
})
