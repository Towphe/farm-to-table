import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});


const Product = mongoose.model('Product', {

    
    name: String,
    description : String,
    type : String,
    quantity : Number,
    unit : String, 
    price: Number
});

const openProduct = async (req, res) => {
    try{
        console.log(req.params.productId)
        res.send(await Product.findById(req.params.productId))
    }catch{
        res.send([]);
    }
};

const showProducts = async (req, res) => {
    const showProducts = await Product.find();

    if (showProducts){
        res.json(showProducts);
    } else {
        res.json([]);
    }
}

export{openProduct, showProducts};