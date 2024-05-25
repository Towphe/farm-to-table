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
    const p = isUndefined(req.query.p) ? 1 : parseInt(req.query.p);
    const c = isUndefined(req.query.c) ? 10 : parseInt(req.query.c);
    const sort = req.query.sort || 'name';
    const filter = req.query.filter ? { type: new RegExp(req.query.filter, 'i') } : {};

    try {
        const productCount = await Product.countDocuments(filter);
        const pageCount = Math.ceil(productCount / c);

        const products = await Product.find(filter).sort(sort).skip((p - 1) * c).limit(c);

        res.json({ products, pages: pageCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const addProduct = async (req, res) => {
    let productId;
    await Product.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        quantity: req.body.quantity,
        unit: req.body.unit,
        price: parseFloat(req.body.price),
        image_url: req.body.image_url
    }).then(res => productId = res._id);

    return res.json({detail: `Added to Product List.`, productId: productId});
}

const addProductImage = async (req, res) => {
    // find product by id
    const productId = req.params.productId;
    let product = Product.findById(productId)
                    .then(async (product) => {
                        const image = req.files.image;
                        const resu = await imageHandler.uploadFiles([image.tempFilePath], 'products', productId);
                        console.log(resu);
                        product.image_url = resu.imageUrls[0];
                        product.save();
                        // console.log(product);
                    });
    console.log(product);
    // if (!product){
    //     res.statusCode = 404;
    //     return res.json({detail: 'Product non-existent'});
    // }

    return res.json({detail: 'Added product image'});
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


export{editItems, retrieveProduct, retrieveProducts, saveToCart, retrieveCart, deleteItems, addProduct, addProductImage};