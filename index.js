const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/routes")
const bodyParser = require("body-parser")
require("dotenv").config();

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/style'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/style'
}));

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false })) 

app.set("view engine", "ejs")

app.use("/", router)


mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return 
        app.listen(process.env.PORT, ()=> {
        console.log("app is ready at http://localhost:8000") 
    })
})
