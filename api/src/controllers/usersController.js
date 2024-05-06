import mongoose from "mongoose";

print(process.env.MONGO_KEY)

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const index = (req, res) => {
    res.send("Welcome to index");
};

export {index}