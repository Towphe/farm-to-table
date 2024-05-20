import mongoose, { mongo } from "mongoose";

const OrderItem = mongoose.model('OrderItems', {
    transactionId: mongoose.Types.ObjectId,  // refers to transaction
    productId : mongoose.Types.ObjectId,     // refers to product
    quantity: Number,
    price: Number
});

// 6643d7377bcd670dd4e5947f
// const orderItem = {
//     transactionId: mongoose.Types.ObjectId("66485ac091d17e1b2b42ef6d"),  // refers to transaction
//     productId : mongoose.Types.ObjectId("6643d7377bcd670dd4e5947f"),     // refers to product
//     quantity: 1,
//     price: 420
// }

export default OrderItem;