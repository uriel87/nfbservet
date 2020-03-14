var mongoose = require("mongoose")
MonthlyIncomes = require('../../models/monthlyIncomes')
User = require('../../models/user')


module.exports = {

    createMonthlyIncomes: async (args, req) => {
        console.log("req in createIncome", req.body)
        userId = req.body.userId
        try{
            const monthlyIncomes = new MonthlyIncomes ({
                user: mongoose.Types.ObjectId(userId),
                name: req.body.variables.name,
                description: req.body.variables.description,
                amount: req.body.variables.amount,
                monthly: req.body.variables.monthly,
                incomeTime: new Date().toISOString(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            })

            const NewMonthlyIncomes = await monthlyIncomes.save()

            const user = await User.findById(userId)
            if(!user) {
                throw new Error("createMonthlyIncomes function - User didn't found")
            }

            user.monthlyIncomesList.push(NewMonthlyIncomes)
            await user.save()
            return NewMonthlyIncomes

        } catch(err) {
            console.log("Error in function createMonthlyIncomes", err)
            throw err
        }
    },
    getMonthlyIncomes: async (args) => {
        console.log("args in getMonthlyIncomes", args)
        try {

            selectedDate = {
                'year': args.monthlyIncomesDateInput.year || new Date().getFullYear(),
                'month': args.monthlyIncomesDateInput.month || new Date().getMonth() + 1
            }

            const monthlyIncomesDates = await MonthlyIncomes.find(selectedDate);
            console.log("monthlyIncomesDates in getMonthlyIncomes", monthlyIncomesDates)

            //return ...monthlyIncomesDates.doc;

            return {
                ...monthlyIncomesDates._doc,
            }

        } catch(err) {
            console.log("Error in function getMonthlyIncomes", err)
            throw err
        }
    },
    editMonthlyIncomes: async (args, req) => {
        console.log("args in editMonthlyIncomes", req.body.variables)
        try{
            const editMonthlyIncomes = {
                name: req.body.variables.name,
                description: req.body.variables.description,
                amount: req.body.variables.amount,
                monthly: req.body.variables.monthly,
            }

            const monthlyIncomes = await MonthlyIncomes.findOneAndUpdate( {_id: mongoose.Types.ObjectId(req.body.variables._id)}, editMonthlyIncomes, {new: true})

            console.log("in function editMonthlyIncomes", monthlyIncomes)
            return monthlyIncomes
        } catch(err) {
            console.log("Error in function editMonthlyIncomes", err)
            throw err
        }
    },
    deleteMonthlyIncomes: async (args, req) => {
        console.log("args in deleteMonthlyIncomes", req.body)
        try{
            const income = await MonthlyIncomes.findByIdAndRemove( {_id: mongoose.Types.ObjectId(req.body.variables._id)})

            const user = await User.findById(userId)
            if(!user) {
                throw new Error("deleteMonthlyIncomes function - User didn't found")
            }
            user.monthlyIncomesList.pull(income.id)
            await user.save()

            return income._id
        } catch(err) {
            console.log("Error in function deleteMonthlyIncomes", err)
            throw err
        }
    }
}