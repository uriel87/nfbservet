
const mongoose = require("mongoose")
User = require('../../models/user')
MonthlyExpectedExpenses = require('../../models/monthlyExpectedExpenses')


module.exports = {

    createMonthlyExpectedExpenses: async (args, req) => {
        console.log("req.body in createExpectedExpenses", req.body)
        userId = req.body.userId
        
        try {
            const expectedExpenses = new MonthlyExpectedExpenses({
                userId: mongoose.Types.ObjectId(userId),
                groceries: req.body.variables.groceries || 0,
                car: req.body.variables.car || 0,
                bills: req.body.variables.bills || 0,
                fun: req.body.variables.fun || 0,
                education: req.body.variables.education || 0,
                devices: req.body.variables.devices || 0,
                clothings: req.body.variables.clothings || 0,
                other: req.body.variables.other || 0,
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                totalExpectedExpenses: req.body.variables.groceries +
                req.body.variables.car +
                req.body.variables.bills +
                req.body.variables.fun +
                req.body.variables.education +
                req.body.variables.devices +
                req.body.variables.clothings +
                req.body.variables.other
            })

            const newExpectedExpenses = await expectedExpenses.save()

            const user = await User.findById(userId)
            if(!user) {
                throw new Error("createTask function - User didn't found")
            }

            user.monthlyExpectedExpensesList.push(newExpectedExpenses)
            await user.save()

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


// const user = await User.update({
//     "_id": '5dd8fad0f2cf5a925104b905'
// },{
//     $set:{'expectedExpenses':newExpectedExpenses
// }})