import mongoose from "mongoose";
import User from "../models/User.js";

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const isUndefined = (element) =>
    {
        if (element === undefined) return true;
        return false;
    }

const index = (req, res) => {
    res.send("Welcome to index");
};

const retrieveUsers = async (req, res) => {
    const p = isUndefined(req.query.p) ? 1 : parseInt(req.query.p);
    const c = isUndefined(req.query.c) ? 10 : parseInt(req.query.c);

    if (req.user.userType !== 'ADMIN'){
        res.statusCode = 403;
        return res.send({detail: 'Unauthorized access'});
    }

    // get orders
    const userCount = await User.countDocuments({});
    const users = await User.find({}).skip((p - 1) * c).limit(c);
    const pageCount = Math.ceil(userCount / c);
    
    res.send({users, pageCount: pageCount});
    return;
}

export {index, retrieveUsers}