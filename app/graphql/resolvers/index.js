const userResolver = require('../resolvers/user'),
      taskResolver = require('../resolvers/task'),
      monthlyExpensesResolver = require('../resolvers/monthlyExpenses')
      monthlyIncomesResolver = require('../resolvers/monthlyIncomes'),
      expectedExpensesResolver = require('../resolvers/expectedExpenses')


const rootResolver = {
    ...userResolver,
    ...taskResolver,
    ...monthlyExpensesResolver,
    ...monthlyIncomesResolver,
    ...expectedExpensesResolver
};

module.exports = rootResolver;