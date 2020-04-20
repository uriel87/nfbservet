
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log("is-auth req.body:",req.body )
    console.log("is-auth req.headers.authorization:",req.headers.authorization )

    let authHedear = req.headers.authorization

    if(!authHedear) {
        req.isAuth = false;
        return next();
    }

    const token = authHedear

    if(!token || token === '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.SK)
        console.log("decodedToken in Authorization", decodedToken)

    } catch(err) {
        req.isAuth = false;
        return next();
    }

    if(!decodedToken) {
        req.isAuth = false;
        return next();
    }
    
    req.isAuth = true
    req.userId = decodedToken.userId

    next()
}