const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
    _id: ID!
    name: String!
    password: String
    email: String!
    tel: String!
    tasksList: [Task]
    monthlyExpensesList:[MonthlyExpenses]
    monthlyIncomesList: [MonthlyIncomes]
    expectedExpenses: ExpectedExpenses
}


enum TaskCategory {
    WORK
    FUN
    FINANCIAL
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
    createTime: String
    daily: Boolean
}

type MonthlyExpenses {
    _id: ID
    user: ID
    name: String
    description: String
    amount: Int
    category: String
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

type monthlyExpensesList {
    monthlyExpensesList:[MonthlyExpenses]
}


type ExpectedExpenses {
    _id: ID!
    groceries: Int,
    car: Int,
    bills: Int,
    fun: Int,
    education: Int,
    devices: Int,
    clothings: Int,
    other: Int,
    year: Int,
    month: Int
}


type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input LoginInput {
    email: String!
    password: String!
}

input CreateUserInput {
    name: String!
    password: String!
    email: String!
    tel: String!
}

input EditUserInput {
    name: String
    password: String
    email: String
    tel: String
}


input CreateTaskInput {
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
    category: String!
    payment: Int!
    paymentLeft: Int
}

input DateInput {
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


input EditTaskInput {
    id: ID!
    name: String!
    description: String!
    category: TaskCategory!
    priority: Priority!
    startTime: String!
    endTime: String!
    daily: Boolean!
}

input DeleteTaskInput {
    id: ID!
}

input DeleteMonthlyIncomesInput {
    id: ID!
}

input EditeMonthlyExpensesInput {
    id: ID!
    name: String!
    description: String!
    amount: Int!
    category: String!
    payment: Int!
    paymentLeft: Int
}

input EditMonthlyIncomesInput {
    id: ID!
    name: String,
    description: String,
    amount: Int,
    monthly: Boolean,
}


type rootQuery {
    getUserDetails: User!
    login(loginInput: LoginInput): AuthData!
    getMonthlyExpenses(monthlyExpensesDateInput: DateInput): [MonthlyExpenses]
    getExpectedExpenses(expectedExpensesDateInput: DateInput): [ExpectedExpenses]
    getMonthlyIncomes(monthlyIncomesDateInput: DateInput): [MonthlyIncomes]
}

type rootMutation {
    createUser(userInput: CreateUserInput): AuthData
    createTask(taskInput: CreateTaskInput): Task
    createMonthlyExpenses(monthlyExpenesInput: MonthlyExpensesInput): MonthlyExpenses
    createMonthlyIncomes(monthlyIncomesInput: MonthlyIncomesInput): MonthlyIncomes
    createExpectedExpenses(expectedExpensesInput: ExpectedExpensesInput): ExpectedExpenses
    editTask(editTaskInput: EditTaskInput): Task
    editUser(editUserInput: EditUserInput): AuthData
    editMonthlyExpenses(editMonthlyExpensesInput: EditeMonthlyExpensesInput): MonthlyExpenses
    editMonthlyIncomes(editMonthlyIncomesInput: EditMonthlyIncomesInput): MonthlyIncomes
    deleteTask(deleteTaskInput: DeleteTaskInput): Task
    deleteMonthlyIncomes(deleteMonthlyIncomesInput: DeleteMonthlyIncomesInput): MonthlyIncomes
}

schema {
    query: rootQuery
    mutation: rootMutation
}

`)



// type rootQuery {
//     getMonthlyExpensesUser: User
// }


// enum MonthlyExpensesCategory {
//     GROCERIES
//     CAR
//     BILLS
//     FUN
//     EDUCATION
//     DEVICES
//     CLOTHINGS
//     OTHER
// }

