
const mongoose = require('mongoose'),
    schema = mongoose.Schema;


const monthlyExpensesSchema = new schema({

    user: {
        type : schema.Types.ObjectId,
        ref: 'User'
    },

    name: String,

    description: String,

    amount: Number,

    category: String,

    payment: Number,

    paymentLeft: Number,

    purchaseTime: String,

    year: Number,

    month: Number

}, {collation: 'monthlyExpenses'})


module.exports = mongoose.model('MonthlyExpenses', monthlyExpensesSchema)


