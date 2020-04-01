const userResolver = require('../resolvers/user'),
      taskResolver = require('../resolvers/task'),
      monthlyExpensesResolver = require('../resolvers/monthlyExpenses')
      monthlyIncomesResolver = require('../resolvers/monthlyIncomes'),
      monthlyExpectedExpensesResolver = require('../resolvers/monthlyExpectedExpenses'),
      authResolver = require('../resolvers/auth')


const rootResolver = {
    ...userResolver,
    ...taskResolver,
    ...monthlyExpensesResolver,
    ...monthlyIncomesResolver,
    ...monthlyExpectedExpensesResolver,
    ...authResolver
};

module.exports = rootResolver;