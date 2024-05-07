import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

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
    
    res.statusCode = 202;
    res.send({'detail': 'Sign up success.', 'token' : accessToken});
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
    
    console.log(jwt.verify(accessToken, accessTokenSecret));

    res.statusCode = 202;
    res.send({'detail': 'Sign in success.', 'token' : accessToken});
}

const test = (req, res) => {
    res.send({'Hello' : 'world'});
}

export {signup, signin, test}