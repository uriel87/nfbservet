
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')


module.exports = {
    // we can use also - login: async ({email, password}) => {
    login: async (args) => {
        // console.log("in login function the args are", args)
        const user = await User.findOne({email: args.email})
        if(!user) {
            throw new Error("invalid credentials")
        };
        const isEqual = await bcrypt.compare(args.password, user.password)
        if(!isEqual || !user) {
            throw new Error("invalid credentials")
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenEcpiration: 1
        }
    }
}