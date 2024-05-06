import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const index = (req, res) => {
    res.send("Welcome to index");
};

export {index}