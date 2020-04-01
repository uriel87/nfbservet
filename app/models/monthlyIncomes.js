
const mongoose = require('mongoose'),
    schema = mongoose.Schema;


const monthlyIncomesSchema = new schema({

    user: {
        type : schema.Types.ObjectId,
        ref: 'User'
    },

    name: String,

    description: String,

    amount: Number,

    monthly: { type: Boolean, default: false},

    category: String,

    time: String,

    year: Number,

    month: Number,

    isExpense: { type: Boolean, default: false},

}, { collection: 'monthlyIncomes'})


module.exports = mongoose.model('monthlyIncomes', monthlyIncomesSchema)