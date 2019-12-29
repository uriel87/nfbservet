
const mongoose = require("mongoose")

User = require('../../models/user')
ExpectedExpenses = require('../../models/expectedExpense')


module.exports = {

    createExpectedExpenses: async (args) => {

        console.log("args in createExpectedExpenses", args)

        try {
            const expectedExpenses = new ExpectedExpenses({
                userId: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
                groceries: args.expectedExpensesInput.groceries,
                car: args.expectedExpensesInput.car,
                bills: args.expectedExpensesInput.bills,
                fun: args.expectedExpensesInput.fun,
                education: args.expectedExpensesInput.education,
                devices: args.expectedExpensesInput.devices,
                clothings: args.expectedExpensesInput.clothings,
                other: args.expectedExpensesInput.other,
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            })

            const newExpectedExpenses = await expectedExpenses.save()

            const user = await User.update({
                "_id": '5dd8fad0f2cf5a925104b905'
            },{
                $set:{'expectedExpenses':newExpectedExpenses
            }})

            if(!user) {
                throw new Error("createExpectedExpenses function - User didn't found")
            }

            // user.expectedExpenses.push(newExpectedExpenses)
            // let doc = await Character.findOneAndUpdate(filter, update);
            //await user.save()
            console.log("userResult", user)

            return newExpectedExpenses

        } catch(err) {
            console.log("Error in function createExpectedExpenses", err)
            throw err
        }

    },
    getExpectedExpenses: async (args) => {
        console.log("args in getExpectedExpenses", args)
        try {

            selectedDate = {
                'year': args.DateInput.year || new Date().getFullYear(),
                'month': args.DateInput.month || new Date().getMonth() + 1
            }

            const expectedExpensesDates = await ExpectedExpenses.find(selectedDate);
            console.log("expectedExpensesDates in expectedExpensesDates", expectedExpensesDates)

            return expectedExpensesDates;

        } catch(err) {
            console.log("Error in function getExpectedExpenses", err)
            throw err
        }
    }

    // editExpectedExpenses: async(args) => {
    //     console.log("args in editExpectedExpenses", args)
    //     try{
    //         const updateExpectedExpenses = {
    //             userId: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
    //             groceries: args.expectedExpensesInput.groceries,
    //             car: args.expectedExpensesInput.car,
    //             bills: args.expectedExpensesInput.bills,
    //             fun: args.expectedExpensesInput.fun,
    //             education: args.expectedExpensesInput.education,
    //             devices: args.expectedExpensesInput.devices,
    //             clothings: args.expectedExpensesInput.clothings,
    //             other: args.expectedExpensesInput.other,
    //         }
    //         const expectedExpenses = await ExpectedExpenses.findOneAndUpdate(updateExpectedExpenses.userId, updateExpectedExpenses, {new: true})
    //         console.log("in function editExpectedExpenses", expectedExpenses)
    //         return expectedExpenses
    //     } catch(err) {
    //         console.log("Error in function editExpectedExpenses", err)
    //         throw err
    //     }
    // }

}