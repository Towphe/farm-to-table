import mongoose from "mongoose";
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

const Product = mongoose.model('Product', {
    name: String,
    description : String,
    type : String,
    quantity : Number,
    unit : String, 
    price: Number,
    image_url: String
});

const ShoppingCart = mongoose.model('ShoppingCart', {
    userId: String,
    productName: String,
    productId: String,
    price: Number,
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

const saveToCart = async (req, res) => {

    await ShoppingCart.create(
    {
        userId: req.user.userId,
        productName: req.body.productName,
        productId: req.body.productId,
        price: req.body.price,
        quantity: req.body.quantity
    });

    return res.json({detail: `Added to cart.`});
}

export{retrieveProduct, retrieveProducts, saveToCart};