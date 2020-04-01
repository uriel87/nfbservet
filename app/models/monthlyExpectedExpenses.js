
const mongoose = require('mongoose'),
      schema = mongoose.Schema
      

const monthlyExpectedExpensesSchema = new schema({
    
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },

    groceries: Number,

    car: Number,

    bills: Number,

    fun: Number,

    education: Number,

    devices: Number,

    clothings: Number,

    other: Number,

    year: Number,

    month: Number,

    totalExpectedExpenses: Number

}, {collection: 'monthlyExpectedExpenses'})


module.exports = mongoose.model('monthlyExpectedExpenses', monthlyExpectedExpensesSchema)

// expectedExpenses