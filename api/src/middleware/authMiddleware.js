import jwt from 'jsonwebtoken';

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1]; // format: ['Bearer', '<token here>']

//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }
            
//             // get expiry date in iso format
//             const expiryDate = new Date(user.exp*1000);

//             // check if token has expired
//             if (expiryDate < Date.now()){
//                 res.statusCode = 403;
//                 return res.send({'detail' : 'Token expired. Signin again to continue session.'});
//             }

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };

const authenticateJWT = (req, res, next) => {
    const authHeader = req.cookies.accessToken;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // check first if cookie exists
    if (authHeader){
        const token = authHeader.split(' ')[1]; // format: ['Bearer', '<token here>']
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
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
    } else{
        res.sendStatus(401);
    }
};

export {authenticateJWT};