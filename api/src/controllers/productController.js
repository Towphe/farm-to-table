import mongoose, { mongo } from "mongoose";
import Product from "../models/Product.js";
import ImageHandler from '../util/imageHandler.js'

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const imageHandler = new ImageHandler();

const isUndefined = (T) => {
    if (T === undefined){
        return true;
    }
    return false;
}

const ShoppingCart = mongoose.model('ShoppingCart', {
    userId: mongoose.Types.ObjectId,
    productName: String,
    productId: mongoose.Types.ObjectId,
    price: mongoose.Types.Decimal128,
    quantity: Number
});

const retrieveProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (!product){
        res.statusCode = 404;
        return res.json({detail : 'Product not found.'});
    }

    res.send(product);
};

const retrieveProducts = async (req, res) => {
    const p = isUndefined(req.query.p) ? 1 : req.query.p;
    const c = isUndefined(req.query.c) ? 10 : req.query.c;

    // also get: total pages depending on `c`
    const productCount = Product.length;
    const pageCount = Math.floor(productCount / c) + 1;

    const products = await Product.find().skip((p - 1) * c).limit(c);
    
    res.send({
        products: products,
        pages: pageCount
    });
}

const addProduct = async (req, res) => {

    await Product.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        quantity: req.body.quantity,
        unit: req.body.unit,
        price: parseFloat(req.body.price),
        image_url: req.body.image_url
    })

    return res.json({detail: `Added to Product List.`})
}

const saveToCart = async (req, res) => {

    await ShoppingCart.create({
        userId: req.user.userId,
        productName: req.body.productName,
        productId: req.body.productId,
        price: new mongoose.Types.Decimal128(req.body.price.toString()),
        quantity: 1
    });

    const product = await Product.findOneAndUpdate(
        { _id: req.body.productId },
        { $inc: { quantity: -1 } }, 
        { new: true } 
    );

    return res.json({ detail: `Added to cart.`, product });
}

const retrieveCart = async (req, res) => {
    const cartItems = await ShoppingCart.find({
        userId: req.user.userId
    });

    return res.send(cartItems);
};

const deleteItems = async (req, res) => {
    const itemId = req.params.itemId;

    const resu = await ShoppingCart.findByIdAndDelete(itemId);
    
    return res.sendStatus(200);
};

const editItems = async (req, res) => {
    const productId = req.params.productId;
    try{
        const result = await Product.findOneAndUpdate(
            {
                // query
                _id : productId
            },
            {
                // update
                $set: {
                    "description": req.body.description,
                    "price": parseFloat(req.body.price),
                    "quantity": req.body.quantity
                }
            },
            {
                upsert: false
            }
        );
        res.json({ success: true});
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export{editItems, retrieveProduct, retrieveProducts, saveToCart, retrieveCart, deleteItems, addProduct};