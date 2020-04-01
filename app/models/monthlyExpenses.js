
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

    amountPerMonth: Number,

    monthly: { type: Boolean, default: false},

    category: String,

    payments: Number,

    time: String,

    year: Number,

    month: Number,

    isExpense: { type: Boolean, default: true},

}, {collation: 'monthlyExpenses'})


module.exports = mongoose.model('MonthlyExpenses', monthlyExpensesSchema)


