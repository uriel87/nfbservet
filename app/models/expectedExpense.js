
const mongoose = require('mongoose')
      schema = mongoose.Schema



const expectedExpenses = new schema({
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
}, {collection: 'expectedExpenses'})


module.exports = mongoose.model('ExpectedExpenses', expectedExpenses)