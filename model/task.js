const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})

const Task = mongoose.model("task", taskSchema);

module.exports = Task;