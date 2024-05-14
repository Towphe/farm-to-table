import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";
import {DateTime} from 'luxon';

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

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

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

    // generate access token
    const accessToken = jwt.sign({userId: user._id, userType: user.userType}, accessTokenSecret, {expiresIn: '30m'});
    
    // res.cookie('access_token', accessToken, {maxAge: 86400, httpOnly: true});
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 1000
    });
    res.statusCode = 202;
    //res.send({'detail': 'Sign up success.', 'accessToken' : accessToken, 'role' : user.userType, 'expiresIn': TOKEN_EXPIRY_TIME});
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
    
    // generate access token
    const accessToken = jwt.sign({userId: user._id, userType: user.userType}, accessTokenSecret, {expiresIn: '30m'});

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: DateTime.now().plus({days: 7}).toJSDate()
    });
    res.statusCode = 202;
    //res.send({'detail': 'Sign up success.', 'accessToken' : accessToken, 'role' : user.userType, 'expiresIn': TOKEN_EXPIRY_TIME});
    res.send({'detail': 'Sign up success.', 'role' : user.userType});   // only role is stored manually by client
}

const test = (req, res) => {
    res.send({'Hello' : 'world'});
}

export {signup, signin, test}