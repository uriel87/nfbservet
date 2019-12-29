
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const authHedear = req.get("Authorization")
    console.log("authHedear in Authorization", authHedear)
    console.log("authHedear in req.body", req.body)
    if(!authHedear) {
        req.isAuth = false;
        return next();
    }

    const token = authHedear//.split('.')[1];
    console.log("token in Authorization", token)

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

    
    //console.log("req in Authorization finishe", req)


    req.isAuth = true
    req.userId = decodedToken.userId
    console.log("req in Authorization finishe", req.isAuth)

    next()
}