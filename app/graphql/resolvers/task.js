
var mongoose = require("mongoose")
Task = require('../../models/task');
//User = require('../../models/user');

//const date = require('../../helpers/date')


module.exports = {
    createTask: async(args) => {
        try {

            console.log("args in createTask", args)

            const task = new Task ({
                user: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
                name: args.taskInput.name,
                description: args.taskInput.description,
                category: args.taskInput.category,
                priority: args.taskInput.priority,
                startTime: args.taskInput.startTime,
                endTime: args.taskInput.endTime,
                CreateTime: new Date().toISOString(),
                daily: args.taskInput.daily 
            })

            const newTask = await task.save();
            
            const user = await User.findById("5dd8fad0f2cf5a925104b905")
            if(!user) {
                throw new Error("createTask function - User didn't found")
            }

            user.taskList.push(newTask)
            await user.save()

            console.log("userResult", user)

            return newTask
            
        } catch(err) {
            console.log("Error in function createTask", err)
            throw err
        }
    }
}