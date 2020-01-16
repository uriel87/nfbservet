
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')


module.exports = {
    // we can use also - login: async ({email, password}) => {
    login: async (args) => {
        console.log("in login function the args are", args)
        const user = await User.findOne({email: args.loginInput.email})
        // console.log("in login function the user are", user)
        if(!user) {
            throw new Error("invalid credentials")
        };
        const isEqual = await bcrypt.compare(args.loginInput.password, user.password)
        //console.log("in login function the isEqual are", isEqual)

        if(!isEqual || !user) {
            throw new Error("invalid credentials")
        }
        //console.log("in login function the user.email, are", user.email)

        const token = jwt.sign({userId: user.id, email: user.email}, 'nfbsecretkey', {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenEcpiration: 1
        }
    }
}