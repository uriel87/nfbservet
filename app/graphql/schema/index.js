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
    monthlyExpectedExpensesList: [MonthlyExpectedExpenses]
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
    amount: Float
    amountPerMonth: Float
    monthly: Boolean
    category: String
    payments: Int
    time: String
    year: Int
    month: Int
    isExpense: Boolean
}


type MonthlyIncomes {
    _id: ID!
    user: ID
    name: String
    description: String
    amount: Float
    monthly: Boolean
    category: String
    time: String
    year: Int
    month: Int
    isExpense: Boolean
}

type monthlyExpensesList {
    monthlyExpensesList:[MonthlyExpenses]
}


type MonthlyExpectedExpenses {
    _id: ID!
    groceries: Int
    car: Int
    bills: Int
    fun: Int
    education: Int
    devices: Int
    clothings: Int
    other: Int
    year: Int
    month: Int
    totalExpectedExpenses: Int
}


type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    status: Int!
}

type Message {
    status: Int
    statusss: Int 
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
    amount: Float!
    monthly: Boolean!
    category: String!
    payments: Int!
}

input DateInput {
    year: Int
    month: Int
}

input MonthlyIncomesInput {
    name: String
    description: String
    amount: Float
    monthly: Boolean
    category: String
}


input MonthlyExpectedExpensesInput {
    groceries: Int
    car: Int
    bills: Int
    fun: Int
    education: Int
    devices: Int
    clothings: Int
    other: Int
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

input DeleteMonthlyExpenseInput {
    id: ID!
}

input EditMonthlyExpenseInput {
    id: ID!
    name: String!
    description: String!
    amount: Float!
    monthly: Boolean!
    category: String!
    payments: Int!
}

input EditMonthlyIncomesInput {
    id: ID!
    name: String,
    description: String
    amount: Float
    monthly: Boolean
    category: String
}

input ForgotPasswordInput {
    email: String
}


type rootQuery {
    getUserDetails: User!
    login(loginInput: LoginInput): AuthData!
    getMonthlyExpenses(monthlyExpensesDateInput: DateInput): [MonthlyExpenses]
    getMonthlyExpectedExpenses(expectedExpensesDateInput: DateInput): [MonthlyExpectedExpenses]
    getMonthlyIncomes(monthlyIncomesDateInput: DateInput): [MonthlyIncomes]
}

type rootMutation {
    createUser(userInput: CreateUserInput): AuthData
    createTask(taskInput: CreateTaskInput): Task
    createMonthlyExpenses(monthlyExpenesInput: MonthlyExpensesInput): MonthlyExpenses
    createMonthlyIncomes(monthlyIncomesInput: MonthlyIncomesInput): MonthlyIncomes
    createMonthlyExpectedExpenses(monthlyExpectedExpensesInput: MonthlyExpectedExpensesInput): MonthlyExpectedExpenses
    editTask(editTaskInput: EditTaskInput): Task
    editUser(editUserInput: EditUserInput): AuthData
    editMonthlyExpense(editMonthlyExpenseInput: EditMonthlyExpenseInput): MonthlyExpenses
    editMonthlyIncomes(editMonthlyIncomesInput: EditMonthlyIncomesInput): MonthlyIncomes
    deleteTask(deleteTaskInput: DeleteTaskInput): Task
    deleteMonthlyIncomes(deleteMonthlyIncomesInput: DeleteMonthlyIncomesInput): MonthlyIncomes
    deleteMonthlyExpense(deleteMonthlyExpenseInput: DeleteMonthlyExpenseInput): MonthlyExpenses
    forgotPassword(forgotPasswordInput: ForgotPasswordInput) : Message
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

