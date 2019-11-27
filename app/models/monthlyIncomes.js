
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

    incomeTime: String,

    year: Number,

    month: Number

}, { collection: 'monthlyIncomes'})


module.exports = mongoose.model('monthlyIncomes', monthlyIncomesSchema)