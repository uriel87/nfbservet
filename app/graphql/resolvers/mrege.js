
const DataLoader = require('dataloader')

User = require('../../models/user')
Task = require('../../models/task')
MonthlyExpeneses = require('../../models/monthlyExpenses')
MonthliIncomes = require('../../models/monthlyIncomes')
MonthlyExpectedExpenses = require('../../models/monthlyExpectedExpenses')


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

    getMonthlyExpectedExpenses: async monthlyExpectedExpensesId => {
        console.log("args in getMonthlyExpectedExpenses merge", monthlyExpectedExpensesId)
                                                                
        try {
            const monthlyExpectedExpenses = await MonthlyExpectedExpenses.find({_id: {$in: monthlyExpectedExpensesId}})
            return monthlyExpectedExpenses.map(monthlyExpectedExpense => {
                return monthlyExpectedExpense;
            })
        } catch(err) {
            console.log("Error in function getMonthlyExpectedExpenses", err)
            throw err
        }
    }

}




