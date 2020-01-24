
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    let authHedear = req.body.headers.Authorization

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
        decodedToken = jwt.verify(token, 'nfbsecretkey')
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

// console.log("req in Authorization - req.isAuth", req.isAuth)
// console.log("req in Authorization - req.userId", req.userId)
//const authHedear = req.get("Authorization")
//console.log("authHedear in Authorization token:", authHedear)
//console.log("req in Authorization token:", req.body.headers)
// return {
//     isAuth: req.isAuth,
//     userId: req.userId
// }