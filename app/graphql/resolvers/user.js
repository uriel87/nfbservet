
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')
const DataLoader = require('dataloader')
const  { taskLoader, monthlyExpensesLoader, monthlyIncomesLoader } = require('../resolvers/dataLoaders');


module.exports = {
    getUserDetails: async (args,req) => {
        const authorization = req.body.headers.Authorization
        try {
            // if(!req.isAuth) {
            //     return new Error("Unauthenticated")
            // }
            console.log('in grapghQL getUserDetails funcion');
            console.log('in grapghQL getUserDetails funcion - req.userId', req.userId);

            //const user = await User.findOne({ email: args.email }).populate('expectedExpenses')
            const user = await User.findById(req.userId).populate('expectedExpenses')
            console.log('User.findOne', user);

            return {
                ...user._doc,
                _id: user.id,
                password: null,
                taskList: () => taskLoader.loadMany(user.taskList),
                monthlyExpensesList: () => monthlyExpensesLoader.loadMany(user.monthlyExpensesList),
                monthlyIncomesList: () => monthlyIncomesLoader.loadMany(user.monthlyIncomesList)
            }

        } catch (err) {
            console.log(err);
        }
    },
    createUser: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error("Unauthenticated")
        // }

        try {
            const userById = await User.findOne({email: args.userInput.email})
            if(userById) {
                return new Error("user exsits already")
            }

            const hashPassword = await bcrypt.hash(args.userInput.password,12);


            const user = new User({
                name: args.userInput.name,
                password: hashPassword,
                email: args.userInput.email,
                tel: args.userInput.tel,
            });

            const userResult = await user.save()
            const token = jwt.sign({userId: userResult._id, email: userResult.email}, 'nfbsecretkey', {
                expiresIn: '1h'
            });

            return {
                ...userResult._doc,
                password: null,
                userId: userResult.id,
                token: token,
                tokenExpiration: 1
            }
            
        } catch(err) {
            console.log(err);
            throw err
        }
    }
}


// console.log("getUserDetails - req", req.body.headers.Authorization)
// console.log("getUserDetails - req.isAuth", req.isAuth)
// console.log("getUserDetails - req.userId", req.userId)
// console.log("getUserDetails - args", args)