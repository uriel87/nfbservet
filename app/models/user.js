/* ----------------------------------
 * create user schema
-------------------------------------*/

const mongoose = require("mongoose"),
	schema = mongoose.Schema;

const userSchema = new schema( {

	name: String,

	password: String,

	email: { type:String,  unique:true },

    tel: String,
    
    tasksList: [{
        type: schema.Types.ObjectId,
        ref: 'Task'
    }],

    monthlyExpensesList: [{
        type: schema.Types.ObjectId,
        ref: 'MonthlyExpenses'
    }],

    monthlyIncomesList: [{
        type: schema.Types.ObjectId,
        ref: 'MonthlyIncomes'
    }],

    expectedExpenses: {
        type: schema.Types.ObjectId,
        ref: 'ExpectedExpenses'
    }

}, {collection: 'users'});

// Define schema name
module.exports = mongoose.model('User',userSchema);