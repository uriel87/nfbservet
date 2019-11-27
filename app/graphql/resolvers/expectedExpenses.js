
const mongoose = require("mongoose")

User = require('../../models/user')
ExpectedExpenses = require('../../models/expectedExpense')


module.exports = {

    createExpectedExpenses: async (args) => {

        console.log("args in createExpectedExpenses", args)

        try {
            const expectedExpenses = new ExpectedExpenses({
                user: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
                groceries: args.expectedExpensesInput.groceries,
                car: args.expectedExpensesInput.car,
                bills: args.expectedExpensesInput.bills,
                fun: args.expectedExpensesInput.fun,
                education: args.expectedExpensesInput.education,
                devices: args.expectedExpensesInput.devices,
                clothings: args.expectedExpensesInput.clothings,
                other: args.expectedExpensesInput.other,
            })

            const NewExpectedExpenses = await expectedExpenses.save()

            const user = await User.update({
                "_id": '5dd8fad0f2cf5a925104b905'
            },{
                $set:{'expectedExpenses':NewExpectedExpenses
            }})

            if(!user) {
                throw new Error("createExpectedExpenses function - User didn't found")
            }

            // user.expectedExpenses.push(NewExpectedExpenses)
            // let doc = await Character.findOneAndUpdate(filter, update);
            //await user.save()
            console.log("userResult", user)

            return NewExpectedExpenses

        } catch(err) {
            console.log("Error in function createExpectedExpenses", err)
            throw err
        }

    }

}