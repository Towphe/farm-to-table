import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

// order schema
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

// order item schema
const OrderItem = mongoose.model('OrderItem', {
    transactionId: String,  // refers to transaction
    productId : String,     // refers to product
    quantity: Number,
    price: Number
});


const confirmOrder = async (req, res) => {
    const orderId = req.params.email;
    const orderStatus = req.params.status;

    if (orderStatus!== 1) {
        return res.status(405).send({ error: 'Invalid order status.' });
    }
    
    await OrderTransaction.FindOneAndUpdate({_id: orderId}, {$set: {orderStatus: 1}} );
    res.send({ message: "Order confirmed successfully." });
};

export {confirmOrder}