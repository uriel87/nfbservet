
var mongoose = require("mongoose")
User = require('../../models/user')
MonthlyExpenses = require('../../models/monthlyExpenses')
const DataLoader = require('dataloader')

const { tasksLoader, monthlyExpensesLoader, monthlyIncomesLoader, monthlyExpensesByDateLoader } = require('../resolvers/dataLoaders');



module.exports = {
    createMonthlyExpenses: async (args, req) => {
        console.log("args in createMonthlyExpenes", args)
        console.log("req.body in createMonthlyExpenes", req.body)
        userId = req.body.userId

        try {
            
            const monthlyExpenes = new MonthlyExpenses({
                user: mongoose.Types.ObjectId(userId),
                name: req.body.variables.name,
                description: req.body.variables.description,
                amount: req.body.variables.amount,
                category: req.body.variables.category,
                payment: req.body.variables.payment || 1,
                paymentLeft: req.body.variables.payment,
                purchaseTime: new Date().toISOString(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            })

            const NewMonthlyExpenes = await monthlyExpenes.save()

            const user = await User.findById(userId)
            //const user = await User.findById("5dd8fad0f2cf5a925104b905")

            
            if (!user) {
                throw new Error("createMonthlyExpenes function - User didn't found")
            }

            user.monthlyExpensesList.push(NewMonthlyExpenes)
            await user.save()

            console.log("userResult", user)

            return NewMonthlyExpenes

        } catch (err) {
            console.log("Error in function createMonthlyExpenes", err)
            throw err
        }

    },
    getMonthlyExpenses: async (args, req) => {
        try {

            selectedDate = {
                user: req.userId,
                year: args.monthlyExpensesDateInput.year || new Date().getFullYear(),
                month: args.monthlyExpensesDateInput.month || new Date().getMonth() + 1
            }
            const monthlyExpectedDates = await MonthlyExpenses.find(selectedDate);
            console.log("monthlyExpectedDates in createIncome", monthlyExpectedDates)
            return monthlyExpectedDates;

        } catch (err) {
            console.log("Error in function getMonthlyExpenses", err)
            throw err
        }
    },
    editMonthlyExpenses: async (args) => {
        console.log("args in editMonthlyExpenses", args)
        try {
            const updateMonthlyExpenes = {
                name: args.editMonthlyExpensesInput.name,
                description: args.editMonthlyExpensesInput.description,
                amount: args.editMonthlyExpensesInput.amount,
                category: args.editMonthlyExpensesInput.category,
                payment: args.editMonthlyExpensesInput.payment,
                paymentLeft: args.editMonthlyExpensesInput.paymentLeft,
            }
            const monthlyExpenes = await MonthlyExpenses.findOneAndUpdate(args.id, updateMonthlyExpenes, { new: true })
            console.log("in function editMonthlyExpenses", monthlyExpenes)
            return monthlyExpenes
        } catch (err) {
            console.log("Error in function editMonthlyExpenses", err)
            throw err
        }
    }
}

// console.log("args in getMonthlyExpenses", args)
// console.log("args in getMonthlyExpenses - year", args.monthlyExpensesDateInput.year)
// console.log("args in getMonthlyExpenses - month", args.monthlyExpensesDateInput.month)
// console.log("args in getMonthlyExpenses - req.userId", req.userId)




// getMonthlyExpensesUser: async (args, req) => {
//     console.log("args in getMonthlyExpensesUser", args)
//     const authorization = req.body.headers.Authorization
//     try {            
//         const user = await User.findById(req.userId)
//         return {
//             monthlyExpensesList: () => monthlyExpensesLoader.loadMany(user.monthlyExpensesList)
//         }

//         } catch (err) {
//             console.log("Error in function getMonthlyExpensesUser", err)
//             throw err
//         }
// },