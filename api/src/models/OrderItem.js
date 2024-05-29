import mongoose, { mongo } from "mongoose";

const OrderItem = mongoose.model('OrderItems', {
    transactionId: mongoose.Types.ObjectId,  // refers to transaction
    productId : mongoose.Types.ObjectId,     // refers to product
    quantity: Number,
    price: Number
});

export default OrderItem;