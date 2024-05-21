import mongoose, { mongo } from "mongoose";
import Product from "../models/Product.js";
import ImageHandler from '../util/imageHandler.js';
import {Decimal128} from 'decimal128';

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
    price: {
        default: 0,
        required: true,
        type: mongoose.Types.Decimal128,
    },
    quantity: {
        default: 0,
        required: true,
        type: Number,
    }
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

const saveToCart = async (req, res) => {
    const cart = await ShoppingCart.findOneAndUpdate(
        {
            // query/match
            userId: req.user.userId,
            productName: req.body.productName
        },
        {   
            // to update / to insert
            $set : {
                userId: req.user.userId,
                productName: req.body.productName,
                productId: req.body.productId
            },
            $inc :{
                quantity: 1,
                price: parseFloat(req.body.price["$numberDecimal"])
            }
        },
        {
            // options
            upsert: true,
            new: true
        }
    )

    return res.json({ detail: `Added to cart.` });
}

const retrieveCart = async (req, res) => {
    const cartItems = await ShoppingCart.find({
        userId: req.user.userId
    });

    return res.send(cartItems);
};

export{retrieveProduct, retrieveProducts, saveToCart, retrieveCart, deleteItems};