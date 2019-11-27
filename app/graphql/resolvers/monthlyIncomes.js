var mongoose = require("mongoose")
MonthlyIncomes = require('../../models/monthlyIncomes')
User = require('../../models/user')


module.exports = {

    createMonthlyIncomes: async (args) => {
        console.log("args in createIncome", args)

        try{
            const monthlyIncomes = new MonthlyIncomes ({
                user: mongoose.Types.ObjectId('5dd8fad0f2cf5a925104b905'),
                name: args.monthlyIncomesInput.name,
                description: args.monthlyIncomesInput.description,
                amount: args.monthlyIncomesInput.amount,
                monthly: args.monthlyIncomesInput.monthly,
                incomeTime: new Date().toISOString(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            })

            const NewMonthlyIncomes = await monthlyIncomes.save()

            const user = await User.findById('5dd8fad0f2cf5a925104b905')
            if(!user) {
                throw new Error("createMonthlyIncomes function - User didn't found")
            }
            
            user.monthlyIncomesList.push(NewMonthlyIncomes)
            await user.save()
            return NewMonthlyIncomes

        } catch(err) {
            console.log("Error in function createMonthlyIncomes", err)
            throw err
        }

    }

}