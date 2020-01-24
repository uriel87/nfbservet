
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')


module.exports = {
    login: async (args) => {
        const user = await User.findOne({email: args.loginInput.email})
        if(!user) {
            throw new Error("invalid credentials")
        };
        const isEqual = await bcrypt.compare(args.loginInput.password, user.password)

        if(!isEqual || !user) {
            throw new Error("invalid credentials")
        }

        const token = jwt.sign({userId: user.id, email: user.email}, 'nfbsecretkey', {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}