
// /* ----------------------------------
//  * create task schema
// -------------------------------------*/

// const Category = ['WORK', 'FUN','FINANCIAL', 'OTHER'];
// const Priority = ['LOW', 'NORMAL','HIGH', 'URGENT'];


const mongoose = require("mongoose"),
	schema = mongoose.Schema;

const taskSchema = new schema( {

    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },

    name: String,

    description: String,

    category: String,

    priority: String,

    startTime: String,

    endTime: String,

    createTime: String,

    daily: { type: Boolean, default: false }

}, { collection: 'tasks' });


module.exports = mongoose.model('Task', taskSchema);