var mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    
    userId:{
        type : mongoose.ObjectId,
        require : true
    },
    task:{
        type : String,
        require:true
    },
    isComplete:{
        type : Boolean,
        default :false
    },
    createdAt:{
        type : Date,
        default:Date.now
    }
})

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;