
const DataLoader = require('dataloader');
const {getTasks, getMonthlyExpeneses, getMonthlyIncomes, getMonthlyExpectedExpenses } = require('../resolvers/mrege')


// The list of data loaders

module.exports = {

    tasksLoader: new DataLoader(taskIds => {
        // console.log("tasksLoader - tasks", taskIds)
        return getTasks(taskIds)
    }),

    monthlyExpensesLoader: new DataLoader(monthlyExpenesIds => {
        return getMonthlyExpeneses(monthlyExpenesIds)
    }),

    monthlyIncomesLoader: new DataLoader( monthlyIncomesIds => {
        return getMonthlyIncomes(monthlyIncomesIds)
    }),

    monthlyExpectedExpensesLoader: new DataLoader( monthlyExpectedExpensesIds => {
        return getMonthlyExpectedExpenses(monthlyExpectedExpensesIds)
    })
    
}




