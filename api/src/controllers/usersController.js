import mongoose from "mongoose";

print(process.env.MONGO_KEY)

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const index = (req, res) => {
    res.send("Welcome to index");
};

const viewUser = async (req, res) => {
    if (req.user.userType !== 'ADMIN'){
        res.statusCode = 403;
        return res.send({detail: 'Unauthorized access'});
    }

    try{
        res.send( await User.find({}));
    }catch(error){
        res.status(501).json([]);
    }
}


const updateUser = async (req, res) => {
    if (req.user.userType !== 'ADMIN'){
        res.statusCode = 403;
        return res.send({detail: 'Unauthorized access'});
    }
    
    const userId = req.user.userId;
    const update = req.body;

    try{
        res.send( await User.findByIdAndUpdate(userId, update));

    }catch{
        res.status(501).json([]);
    }
}

export {index, viewUser, updateUser}