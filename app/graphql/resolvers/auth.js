
User = require('../../models/user')
const jwt = require('jsonwebtoken')
bcrypt = require('bcryptjs')


module.exports = {
    login: async (args, req) => {
        const user = await User.findOne({email: req.body.variables.email.toLowerCase().trim()})
        if(!user) {
            throw new Error("invalid credentials")
        };
        const isEqual = await bcrypt.compare(req.body.variables.password, user.password)

        if(!isEqual || !user) {
            throw new Error("invalid credentials")
        }

        const token = jwt.sign({userId: user.id, email: user.email}, 'nfbsecretkey', {
            expiresIn: '24h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}