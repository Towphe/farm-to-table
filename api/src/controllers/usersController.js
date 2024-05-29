import mongoose from "mongoose";
import User from "../models/User.js";

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const index = (req, res) => {
    res.send("Welcome to index");
};

const retrieveUsers = async (req, res) => {
    if (req.user.userType !== 'ADMIN'){
        res.statusCode = 403;
        return res.send({detail: 'Unauthorized access'});
    }
    
    res.send( await User.find({}));
}

export {index, retrieveUsers}