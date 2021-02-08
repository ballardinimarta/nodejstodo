const express = require("express");
const Task = require("../model/task");
const router = express.Router();

let sorted = 1;
let page = 1;

router.get("/", async (req, res) => {
    sorted = req.query.sort;
    page = req.query.page;
    try {
        const count = await Task.find();
        const data = await Task.find().sort({date: sorted}).skip((page-1)*5).limit(5);
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css", count: count.length, page:page, sorted:sorted})
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

router.get( "/edit/:id", async (req, res) => {
    try {
        sorted = req.query.sort;
        page = req.query.page;
        console.log(sorted, page)
        const task = await Task.findOne({_id: req.params.id})
        const count = await Task.find();
        const data = await Task.find().sort({date:sorted}).skip((page-1) * 5).limit(5);
        res.render("index.ejs", {task: task, id: req.params.id, data:data, error: " ", csslink: "../style/main.css", count: count.length, page:page, sorted:sorted})
    } catch (error) {
        res.render("error.ejs", {error :error}) 
    }
    
})

router.post("/edit", async (req, res) => {
    try {
        await Task.updateOne({_id:req.body.id},{ name:req.body.name});
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", { error: error})

    }
    
})

router.get("/delete/:id", async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id})
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", { error: error})

    }
})

module.exports = router;
