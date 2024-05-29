import mongoose from "mongoose";

const Product = mongoose.model('Product', {
    name: String,
    description : String,
    type : String,
    quantity : Number,
    unit : String, 
    price: mongoose.Types.Decimal128,
    image_url: String
});

export default Product;