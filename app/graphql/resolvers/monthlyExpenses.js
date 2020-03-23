
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
                monthly: req.body.variables.monthly,
                category: req.body.variables.category,
                payments: req.body.variables.payments || 1,
                // paymentLeft: req.body.variables.payments,
                time: new Date().toISOString(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
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
    editMonthlyExpense: async (args, req) => {
        console.log("req.body in editMonthlyExpense", req.body)
        try {
            const updateMonthlyExpene = {
                name: req.body.variables.name,
                description: req.body.variables.description,
                amount: req.body.variables.amount,
                monthly: req.body.variables.monthly,
                category: req.body.variables.category,
                payments: req.body.variables.payments,
                isExpense: true
            }
            // const monthlyExpenes = await MonthlyExpenses.findOneAndUpdate(args.id, updateMonthlyExpene, { new: true })
            const monthlyExpenes = await MonthlyExpenses.findOneAndUpdate( {_id: mongoose.Types.ObjectId(req.body.variables._id)}, updateMonthlyExpene, {new: true})

            console.log("in function editMonthlyExpense", monthlyExpenes)
            return monthlyExpenes
        } catch (err) {
            console.log("Error in function editMonthlyExpense", err)
            throw err
        }
    },
    // editMonthlyExpense: async (args, req) => {
    //     console.log("req.body in editMonthlyExpense", req.body)
    //     try {
    //         const updateMonthlyExpene = {
    //             name: req.body.variables.name,
    //             description: req.body.variables.description,
    //             amount: req.body.variables.amount,
    //             category: req.body.variables.category,
    //             payment: req.body.variables.payment,
    //             paymentLeft: req.body.variables.paymentLeft,
    //             isExpense: true
    //         }
    //         const monthlyExpenes = await MonthlyExpenses.findOneAndUpdate(args.id, updateMonthlyExpene, { new: true })
    //         console.log("in function editMonthlyExpense", monthlyExpenes)
    //         return monthlyExpenes
    //     } catch (err) {
    //         console.log("Error in function editMonthlyExpense", err)
    //         throw err
    //     }
    // },
    deleteMonthlyExpense: async (args, req) => {
        console.log("args in deleteMonthlyExpense", req.body)
        try{
            const expense = await MonthlyExpenses.findByIdAndRemove( {_id: mongoose.Types.ObjectId(req.body.variables._id)})
            console.log("deleteMonthlyExpense expense", expense)

            const user = await User.findById(userId)
            if(!user) {
                throw new Error("deleteMonthlyExpense function - User didn't found")
            }
            user.monthlyExpensesList.pull(expense._id)
            await user.save()

            return expense._id
        } catch(err) {
            console.log("Error in function deleteMonthlyIncomes", err)
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