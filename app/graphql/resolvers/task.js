
var mongoose = require("mongoose")
Task = require('../../models/task');
//User = require('../../models/user');

//const date = require('../../helpers/date')


module.exports = {
    createTask: async(args, req) => {
        try {

            // console.log("args in createTask", args)
            console.log("req.body in createTask", req.body.variables)
            userId = req.body.userId

            const task = new Task ({
                user: mongoose.Types.ObjectId(userId),
                name: req.body.variables.name,
                description: req.body.variables.description,
                category: req.body.variables.category,
                priority: req.body.variables.priority,
                startTime: req.body.variables.startTime,
                endTime: req.body.variables.endTime,
                createTime: new Date().toISOString(),
                daily: req.body.variables.daily || false
            })

            const newTask = await task.save();
            
            const user = await User.findById("5dd8fad0f2cf5a925104b905")
            if(!user) {
                throw new Error("createTask function - User didn't found")
            }

            user.taskList.push(newTask)
            await user.save()

            console.log("user in function createTask", user)

            return newTask
            
        } catch(err) {
            console.log("Error in function createTask", err)
            throw err
        }
    },
    updateTask: async(args) => {
        console.log("args in updateTask", args)
        try{
            const taskDetails = {
                name: args.updateTask.name,
                description: args.updateTask.description,
                category: args.updateTask.category,
                priority: args.updateTask.priority,
                startTime: args.updateTask.startTime,
                endTime: args.updateTask.endTime,
                daily: args.updateTask.daily 
            }
            const task = await Task.findOneAndUpdate(args.id, taskDetails, {new: true})
            console.log("in function updateTask", task)
            return task
        } catch(err) {
            console.log("Error in function updateTask", err)
            throw err
        }
    }
}