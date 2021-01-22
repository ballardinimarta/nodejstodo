const express = require("express");
const mongoose = require("mongoose")
const Task = require("../model/task");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await Task.find();
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css"})
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
   
})

router.post("/", async (req, res) => {
    try {
        await new Task({
            name: req.body.name
        }).save()
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
    
})

router.get("/edit/:id", async (req, res) => {
    try {
        const data = await Task.find()
        const task = await Task.findOne({_id: req.params.id})
        res.render("index.ejs", {task: task, id: req.params.id, data:data, error: " ", csslink: "../style/main.css"})

    } catch (err) {
        res.render("error.ejs", {error :err}) 
    }
    
})

router.post("/edit", async (req, res) => {
    try {
        console.log(req.body)
        await Task.updateOne({_id:req.body.id},{ name:req.body.name});
        res.redirect("/");
    } catch (err) {
        res.render("error.ejs", { error: err})

    }
    
})

router.get("/delete/:id", async (req, res) => {
    await Task.deleteOne({_id: req.params.id})
    res.redirect("/");

})

router.get("/sort/:id", async (req, res) => {
    try {
        if (req.params.id == "name") {
            const data = await Task.find().sort({ name : 1});
            res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css"})

        } else if (req.params.id == "date") {
            const data = await Task.find().sort({ date : 1});
            res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css"})
        }
        
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
})

module.exports = router;
