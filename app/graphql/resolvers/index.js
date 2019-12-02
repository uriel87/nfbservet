const userResolver = require('../resolvers/user'),
      taskResolver = require('../resolvers/task'),
      monthlyExpensesResolver = require('../resolvers/monthlyExpenses')
      monthlyIncomesResolver = require('../resolvers/monthlyIncomes'),
      expectedExpensesResolver = require('../resolvers/expectedExpenses'),
      authResolver = require('../resolvers/auth')


const rootResolver = {
    ...userResolver,
    ...taskResolver,
    ...monthlyExpensesResolver,
    ...monthlyIncomesResolver,
    ...expectedExpensesResolver,
    ...authResolver
};

module.exports = rootResolver;