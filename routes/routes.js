const express = require("express");
const mongoose = require("mongoose")
const Task = require("../model/task");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await Task.find();
    res.render("index.ejs", {data:data})
})

router.post("/", async (req, res) => {
    await new Task({
        name: req.body.name
    }).save()
    res.redirect("/");
})

router.get("/delete/:id", async (req, res) => {
    await Task.deleteOne({_id: req.params.id})
    res.redirect("/");

})

module.exports = router;
