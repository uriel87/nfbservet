
const DataLoader = require('dataloader')

User = require('../../models/user')
Task = require('../../models/task')
MonthlyExpeneses = require('../../models/monthlyExpenses')
MonthliIncomes = require('../../models/monthlyIncomes')
ExpectedExpenses = require('../../models/expectedExpense')


module.exports = {
    
    getTasks: async taskIds => {
        console.log("args in getTasks merge", taskIds)

        try {
            const tasks = await Task.find({_id: {$in: taskIds} } )
            return tasks.map( task => {
                return task
            })
        } catch (err) {
            console.log("Error in function getTasks", err)
            throw err;
        }
    },

    getMonthlyExpeneses: async monthlyExpenesIds => {
        console.log("args in getmonthlyExpeneses merge", monthlyExpenesIds)

        try {
            const monthlyExpeneses = await MonthlyExpeneses.find({_id: {$in: monthlyExpenesIds} } )
            return monthlyExpeneses.map( monthlyExpenes => {
                return monthlyExpenes
            })
        } catch (err) {
            console.log("Error in function getMonthlyExpeneses", err)
            throw err;
        }
    },

    getMonthlyIncomes: async monthlyIncomesIds => {
        console.log("args in getMonthlyIncomes merge", monthlyIncomesIds)

        try {
            const monthlyIncomes = await MonthliIncomes.find({_id: {$in: monthlyIncomesIds}})
            return monthlyIncomes.map(monthlyIncome => {
                return monthlyIncome;
            })
        } catch(err) {
            console.log("Error in function getMonthlyIncomes", err)
            throw err
        }
    },

    getExpextedExpenses: async expectedExpensesId => {
        console.log("args in getExpextedExpenses merge", expectedExpensesId)

        try {
            const expectedExpenses = await ExpectedExpenses.findById(expectedExpensesId)
            return expectedExpenses
        } catch(err) {
            console.log("Error in function getExpextedExpenses", err)
            throw err
        }
    }

}




