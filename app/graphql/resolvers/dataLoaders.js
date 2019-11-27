
const DataLoader = require('dataloader');
const {getTasks, getMonthlyExpeneses, getMonthlyIncomes } = require('../resolvers/mrege')


// The list of data loaders

module.exports = {
    taskLoader: new DataLoader(taskIds => {
        return getTasks(taskIds)
    }),

    monthlyExpensesLoader: new DataLoader(monthlyExpenesIds => {
        return getMonthlyExpeneses(monthlyExpenesIds)
    }),

    monthlyIncomesLoader: new DataLoader( monthlyIncomesIds => {
        return getMonthlyIncomes(monthlyIncomesIds)
    })
}




