const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
    _id: ID!
    name: String!
    password: String
    email: String!
    tel: String!
    taskList: [Task]
    monthlyExpensesList:[MonthlyExpenses]
    monthlyIncomesList: [MonthlyIncomes]
    expectedExpenses: expectedExpenses
}


enum TaskCategory {
    WORK
    FUN
    FINANCIAL
    OTHER
}

enum MonthlyExpensesCategory {
    GROCERIES
    CAR
    BILLS
    FUN
    EDUCATION
    DEVICES
    CLOTHINGS
    OTHER
}

enum Priority {
    LOW
    NORMAL
    HIGH
    URGENT
}

type Task {
    _id: ID!
    user: ID
    name: String!
    category: TaskCategory
    priority: Priority
    description: String
    startTime: String
    endTime: String
    CreateTime: String
    daily: Boolean
}

type MonthlyExpenses {
    _id: ID
    user: ID
    name: String
    description: String
    amount: Int
    category: MonthlyExpensesCategory
    payment: Int
    paymentLeft: Int
    purchaseTime: String
    year: Int
    month: Int
}


type MonthlyIncomes {
    _id: ID!
    user: ID
    name: String,
    description: String,
    amount: Int,
    monthly: Boolean,
    incomeTime: String,
    year: Int,
    month: Int
}


type expectedExpenses {
    _id: ID!
    groceries: Int,
    car: Int,
    bills: Int,
    fun: Int,
    education: Int,
    devices: Int,
    clothings: Int,
    other: Int,
}


type AuthData {
    userId: ID!
    token: String!
    tokenEcpiration: Int!
}



input UserInput {
    name: String!
    password: String!
    email: String!
    tel: String!
}


input TaskInput {
    name: String!
    description: String!
    category: TaskCategory!
    priority: Priority!
    startTime: String!
    endTime: String!
    daily: Boolean!
}

input MonthlyExpensesInput {
    name: String!
    description: String!
    amount: Int!
    category: MonthlyExpensesCategory!
    payment: Int!
    paymentLeft: Int
}

input MonthlyExpensesDateInput {
    year: Int
    month: Int
}

input MonthlyIncomesInput {
    name: String,
    description: String,
    amount: Int,
    monthly: Boolean,
}


input ExpectedExpensesInput {
    groceries: Int,
    car: Int,
    bills: Int,
    fun: Int,
    education: Int,
    devices: Int,
    clothings: Int,
    other: Int,
}


type rootQuery {
    getUser(email: String!): User!
    login(email: String!, password: String!): AuthData!
    getMonthlyExpenses(monthlyExpensesDateInput: MonthlyExpensesDateInput): [MonthlyExpenses]
}

type rootMutation {
    createUser(userInput: UserInput): User
    createTask(taskInput: TaskInput): Task
    createMonthlyExpenses(monthlyExpenesInput: MonthlyExpensesInput): MonthlyExpenses
    createMonthlyIncomes(monthlyIncomesInput: MonthlyIncomesInput): MonthlyIncomes
    createExpectedExpenses(expectedExpensesInput: ExpectedExpensesInput): expectedExpenses
}

schema {
    query: rootQuery
    mutation: rootMutation
}

`)