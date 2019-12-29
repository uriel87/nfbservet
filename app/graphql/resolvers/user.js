
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')
const DataLoader = require('dataloader')
const  { taskLoader, monthlyExpensesLoader, monthlyIncomesLoader } = require('../resolvers/dataLoaders');


module.exports = {
    getUserDetails: async (args,req) => {
        try {
            if(!req.isAuth) {
                return new Error("Unauthenticated")
            }
            console.log('in grapghQL getUserDetails funcion');
            //const user = await User.findOne({ email: args.email }).populate('expectedExpenses')
            const user = await User.findById('5dd8fad0f2cf5a925104b905').populate('expectedExpenses')
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
                tokenEcpiration: 1
            }
            
        } catch(err) {
            console.log(err);
            throw err
        }
    }
    // ,
    // // we can use also - login: async ({email, password}) => {
    // login: async (args) => {
    //     // console.log("in login function the args are", args)
    //     const user = await User.findOne({email: args.email})
    //     if(!user) {
    //         throw new Error("User does not exist")
    //     };
    //     const isEqual = await bcrypt.compare(args.password, user.password)
    //     if(!isEqual) {
    //         throw new Error("invalid credentials")
    //     }
    //     const token = jwt.sign({userId: user.id, email: user.email}, 'nfbsecretkey', {
    //         expiresIn: '1h'
    //     });
    //     return {
    //         userId: user.id,
    //         token: token,
    //         tokenEcpiration: 1
    //     }
    // }
}