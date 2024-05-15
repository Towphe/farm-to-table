import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const TOKEN_EXPIRY_TIME = 604800;   // 1 week (in seconds)

const User = mongoose.model('users', {
    firstName : String,
    middleName : String,
    lastName : String,
    userType : String,
    email : String,
    password : String
});

const index = (req, res) => {
    res.send("Welcome to index");
};

// creates new customer user
const signup = async (req, res) => {
    const saltRounds = 10;
    let user = await User.findOne({email: req.body.email});
    
    // check if user exists
    if (user != null){
        res.statusCode = 400;
        res.send({'detail' : 'Email is already taken.'})
        return;
    }

    // initialize user record
    user = new User();
    user.firstName = req.body.firstName;
    user.middleName = req.body.middleName ?? null;
    user.lastName = req.body.lastName;
    user.userType = 'CUSTOMER';
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, saltRounds);

    // save user to db
    await user.save();

    // generate access token & refresh token
    const accessToken = jwt.sign({userId: user._id, userType: user.userType}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign({userId: user._id, userType: user.userType}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 1 * 30 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.statusCode = 202;
    
    res.send({'detail': 'Sign up success.', 'role' : user.userType});   // only role is stored manually by client
};

// signs user in
const signin = async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    // check if user exists
    if (user == null){
        res.statusCode = 400;
        res.send({'detail' : 'Invalid credentials. Email and/or password is incorrect.'})
        return;
    }

    // check if password matches what is stored in db
    const isSigninSuccess = await bcrypt.compare(req.body.password, user.password);

    // check if signin was success
    if (!isSigninSuccess){
        res.statusCode = 400;
        res.send({'detail' : 'Invalid credentials. Email and/or password is incorrect.'})
        return;
    }
    
    // generate access token & refresh token
    const accessToken = jwt.sign({userId: user._id, userType: user.userType}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign({userId: user._id, userType: user.userType}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 1 * 30 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.statusCode = 202;

    res.send({'detail': 'Sign in success.', 'role' : user.userType});   // only role is stored manually by client
}

// refreshes access token
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken){
        res.statusCode = 200;
        return res.json({detail: "Unauthenticated"});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
            res.statusCode = 403;
            return res.json({detail: "Unauthorized"});
        }
        // re-generate new access token
        const accessToken = jwt.sign({userId: user._id, userType: user.userType}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 1 * 30 * 60 * 1000
        });
    })
    res.statusCode = 202;
    return res.json({detail: 'Successfully refreshed'});
};

// signs out user
const signOut = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.statusCode = 202;
    return res.json({detail: 'Successfully logged out'});
}

const test = (req, res) => {
    res.send({'Hello' : 'world'});
}

export {signup, signin, test, refreshToken, signOut}