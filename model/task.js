const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase:true},
    date: {type: Date, default: Date.now}
})

const Task = mongoose.model("task", taskSchema);

module.exports = Task;