import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    // console.log(req.secureCookies);
    // check first if cookie exists
    if (accessToken){
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.statusCode = 403;
                return res.send(err)
            }
            // re-checked expiry date in case
            // get expiry date in iso format
            const expiryDate = new Date(user.exp*1000);
            // check if token has expired
            if (expiryDate < Date.now()){
                res.statusCode = 403;
                return res.send({'detail' : 'Token expired. Signin again to continue session.'});
            }
            req.user = user;

            next();
        });
    } 
    else{
        res.sendStatus(401);
    }
};

export {authenticateJWT};