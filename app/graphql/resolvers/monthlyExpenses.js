
var mongoose = require("mongoose")
User = require('../../models/user')
MonthlyExpenses = require('../../models/monthlyExpenses')



module.exports = {
    createMonthlyExpenses: async(args) => {
        console.log("args in createMonthlyExpenes", args)

        try {
            const monthlyExpenes = new MonthlyExpenses({
                user: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
                name: args.monthlyExpenesInput.name,
                description: args.monthlyExpenesInput.description,
                amount: args.monthlyExpenesInput.amount,
                category: args.monthlyExpenesInput.category,
                payment: args.monthlyExpenesInput.payment,
                paymentLeft: args.monthlyExpenesInput.paymentLeft,
                purchaseTime: new Date().toISOString(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            })

            const NewMonthlyExpenes = await monthlyExpenes.save()

            const user = await User.findById('5dd8fad0f2cf5a925104b905')
            if(!user) {
                throw new Error("createMonthlyExpenes function - User didn't found")
            }

            user.monthlyExpensesList.push(NewMonthlyExpenes)
            await user.save()

            console.log("userResult", user)

            return NewMonthlyExpenes

        } catch(err) {
            console.log("Error in function createMonthlyExpenes", err)
            throw err
        }

    },
    getMonthlyExpenses: async (args,req) => {
        console.log("args in getMonthlyExpenses", args)
        console.log("args in getMonthlyExpenses - year", args.monthlyExpensesDateInput.year)
        console.log("args in getMonthlyExpenses - month", args.monthlyExpensesDateInput.month)
        console.log("args in getMonthlyExpenses - req.userId", req.userId)

        try {

            selectedDate = {
                user: req.userId,
                year: args.monthlyExpensesDateInput.year || new Date().getFullYear(),
                month: args.monthlyExpensesDateInput.month || new Date().getMonth() + 1
            }
            const monthlyExpectedDates = await MonthlyExpenses.find(selectedDate);
            console.log("monthlyExpectedDates in createIncome", monthlyExpectedDates)
            return monthlyExpectedDates;

        } catch(err) {
            console.log("Error in function getMonthlyExpenses", err)
            throw err
        }
    },
    editMonthlyExpenses: async(args) => {
        console.log("args in editMonthlyExpenses", args)
        try{
            const updateMonthlyExpenes = {
                name: args.editMonthlyExpensesInput.name,
                description: args.editMonthlyExpensesInput.description,
                amount: args.editMonthlyExpensesInput.amount,
                category: args.editMonthlyExpensesInput.category,
                payment: args.editMonthlyExpensesInput.payment,
                paymentLeft: args.editMonthlyExpensesInput.paymentLeft,
            }
            const monthlyExpenes = await MonthlyExpenses.findOneAndUpdate(args.id, updateMonthlyExpenes, {new: true})
            console.log("in function editMonthlyExpenses", monthlyExpenes)
            return monthlyExpenes
        } catch(err) {
            console.log("Error in function editMonthlyExpenses", err)
            throw err
        }
    }

}