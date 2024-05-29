import mongoose from "mongoose";

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

export default ShoppingCart;