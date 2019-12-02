
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
    getMonthlyExpenses: async (args) => {
        console.log("args in createIncome", args)
        try {

            selectedDate = {
                'year': args.monthlyExpensesDateInput.year || new Date().getFullYear(),
                'month': args.monthlyExpensesDateInput.month || new Date().getMonth() + 1
            }

            const monthlyExpectedDates = await MonthlyExpenses.find(selectedDate);
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