
var mongoose = require("mongoose")
Task = require('../../models/task');
//User = require('../../models/user');

//const date = require('../../helpers/date')


module.exports = {
    createTask: async(args, req) => {
        try {

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
            
            const user = await User.findById(userId)
            if(!user) {
                throw new Error("createTask function - User didn't found")
            }

            user.tasksList.push(newTask)
            await user.save()

            console.log("user in function createTask", user)

            return newTask
            
        } catch(err) {
            console.log("Error in function createTask", err)
            throw err
        }
    },
    editTask: async (args, req) => {
        console.log("args in editTask", req.body.variables)
        try{
            const taskDetails = {
                name: req.body.variables.name,
                description: req.body.variables.description,
                category: req.body.variables.category,
                startTime: req.body.variables.startTime,
                endTime: req.body.variables.endTime,
                daily: req.body.variables.daily 
            }

            const task = await Task.findOneAndUpdate( {_id: mongoose.Types.ObjectId(req.body.variables._id)}, taskDetails, {new: true})

            console.log("in function editTask", task)
            return task
        } catch(err) {
            console.log("Error in function editTask", err)
            throw err
        }
    },
    deleteTask: async(args, req) => {
        console.log("args in deleteTask", req.body.variables)
        try{
            const task = await Task.findByIdAndRemove( {_id: mongoose.Types.ObjectId(req.body.variables._id)})

            const user = await User.findById(userId)
            if(!user) {
                throw new Error("deleteTask function - User didn't found")
            }
            user.tasksList.pull(task.id)
            await user.save()

            return task._id
        } catch(err) {
            console.log("Error in function deleteTask", err)
            throw err
        }
    }
}