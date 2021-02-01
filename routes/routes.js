const express = require("express");
const Task = require("../model/task");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const count = await Task.find();
        const data = await Task.find().limit(5);
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css", count: count.length})
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
        const task = await Task.findOne({_id: req.params.id})
        const count = await Task.find();
        const index = count.findIndex(x => x.name === task.name);
        let page = Math.ceil((index+1)/5)    
        const data = await Task.find().skip((page-1) * 5).limit(5);
        res.render("index.ejs", {task: task, id: req.params.id, data:data, error: " ", csslink: "../style/main.css", count: count.length})

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

router.get("/sort=:id", async (req, res) => {
    try {
        if (req.params.id == "name") {
            const count = await Task.find();
            const data = await Task.find().sort({name: 1}).limit(5);
            res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css", count: count.length})

        } else if (req.params.id == "date") {
            const count = await Task.find();
            const data = await Task.find().sort({date: 1}).limit(5);
            res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css", count: count.length})
        }
        
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
})

router.get("/page=:id", async (req, res) => {
    try {
        const count = await Task.find();
        const data = await Task.find().skip(Number(req.params.id-1)*5).limit(5);
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css", count:count.length})
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
   
})

// router.get('/sort', async (req, res) => {
//     try {
//         const count = await Task.find();
//         let page = Math.ceil((index+1)/5)    


//         if (req.query.sort == "name") {
//             console.log("name")
//             const count = await Task.find();
//             const data = await Task.find().sort({name: 1}).skip((page-1) * 5).limit(5);
//             res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css", count: count.length})

//         } else if (req.query.sort == "date") {
//             console.log("sort")

//             const count = await Task.find();
//             const data = await Task.find().sort({date: 1}).skip((page-1) * 5).limit(5);
//             res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "../../style/main.css", count: count.length})
//         }
        
//     } catch (error) {
//         res.render("error.ejs", {error: error})
//     }
//   })

module.exports = router;
