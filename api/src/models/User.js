import mongoose from "mongoose";

const User = mongoose.model('users', {
    firstName : String,
    middleName : String,
    lastName : String,
    userType : String,
    email : String,
    password : String
});

export default User;