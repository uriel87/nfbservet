
User = require('../../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
bcrypt = require('bcryptjs')
const DataLoader = require('dataloader')
const  { tasksLoader, monthlyExpensesLoader, monthlyIncomesLoader } = require('../resolvers/dataLoaders');


module.exports = {
    getUserDetails: async (args,req) => {
        try {
            // if(!req.isAuth) {
            //     return new Error("Unauthenticated")
            // }
            userId = req.body.userId
            const user = await User.findById(userId).populate('expectedExpenses')
            console.log("getUserDetails - user", user)
            return {
                ...user._doc,
                _id: user.id,
                password: null,
                tasksList: () => tasksLoader.loadMany(user.tasksList),
                monthlyExpensesList: () => monthlyExpensesLoader.loadMany(user.monthlyExpensesList),
                monthlyIncomesList: () => monthlyIncomesLoader.loadMany(user.monthlyIncomesList)
            }
        } catch (err) {
            console.log(err);
        }
    },
    createUser: async (args, req) => {
        try {
            const userById = await User.findOne({email: req.body.variables.email})
            if(userById) {
                return new Error("user exsits already")
            }

            const hashPassword = await bcrypt.hash(req.body.variables.password,12);

            const user = new User({
                name: req.body.variables.name.toLowerCase(),
                password: hashPassword,
                email: req.body.variables.email.toLowerCase().trim(),
                tel: req.body.variables.tel,
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
    },
    editUser: async (args, req) => {

        console.log("editUser - req.body", req.body.variables)

        try {
            const emailUser = await User.findOne({email: req.body.variables.email})

            if(emailUser) {
                if((emailUser.email != req.body.variables.email) && emailUser) {
                    return new Error("user exsits already")
                }
            }

            userId = req.body.userId

            let hashPassword 
            if(req.body.variables.password) {
                hashPassword = await bcrypt.hash(req.body.variables.password,12);
            }
            const user = await User.findById(userId)

            const userDetailsEdit = {
                name: req.body.variables.name.toLowerCase(),
                password: hashPassword || user.password,
                email: req.body.variables.email.toLowerCase().trim(),
                tel: req.body.variables.tel,
            }

            const userEdited = await User.findOneAndUpdate( {_id: mongoose.Types.ObjectId(userId)}, userDetailsEdit, {upsert: true})
            
            const token = jwt.sign({userId: userEdited._id, email: userEdited.email}, 'nfbsecretkey', {
                expiresIn: '1h'
            });

            return {
                ...userEdited._doc,
                password: null,
                userId: userEdited.id,
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

// const user = new User({
//     name: args.userInput.name.toLowerCase(),
//     password: hashPassword,
//     email: args.userInput.email.toLowerCase().trim(),
//     tel: args.userInput.tel,
// });