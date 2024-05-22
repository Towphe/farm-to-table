import mongoose from "mongoose";

const OrderTransaction = mongoose.model('Order', {
    email: String,
    status: Number,
    totalPrice: Number,
    createdAt: Date,
    street : String,
    brgy: String,
    city : String,
    province : String
});

export default OrderTransaction;