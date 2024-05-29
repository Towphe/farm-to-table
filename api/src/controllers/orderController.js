import mongoose, { mongo } from "mongoose";
import OrderTransaction from "../models/OrderTransaction.js";
import OrderItem from "../models/OrderItem.js";
import {DateTime} from "luxon";
import ShoppingCart from "../models/ShoppingCart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

await mongoose.connect(process.env.MONGO_KEY, 
{
    useNewUrlParser: true, useUnifiedTopology: true
});

const isUndefined = (element) =>
{
    if (element === undefined) return true;
    return false;
}

/* 
Find order:
* check matching transactionId and productId...
* If match pareho, then I can return transactionId and productId
* else, result to error: order not found
* In every product, same lang ang transactionId.
* Si productId naman different and sorted dapat

Create list of orders:
* for loop in a way
* sort according to productId

Create order
* import body ng OrderTransaction then post sa website yung request
*/

// const findOrder = async (req, res) =>
// {
//     // find matching orders. Use productId to double check
//     const ord = await OrderItem.findById(req.params.transactionId);
//     const prod = await OrderItem.findById(req.params.productId);
    
//     if (!(ord && prod))
//         return res.status(404).json({ message: 'Order not found.' });

//     res.send(ord, prod);
// };

const confirmOrder = async (req, res) => {
    const orderId = req.params.email;
    const orderStatus = req.params.status;

    if (orderStatus!== 1) {
        return res.status(405).send({ error: 'Invalid order status.' });
    }
    
    await OrderTransaction.FindOneAndUpdate({_id: orderId}, {$set: {orderStatus: 1}} );
//    res.send({ message: "Order confirmed successfully." });
};

const retrieveOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await OrderTransaction.findById(orderId);

    // check first if order exists.
    if (order === null){
        res.statusCode = 404;
        res.json({detail: 'Order non-existent'});
        return;
    }

    const items = await OrderItem.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "detail"
                }
            }
    ]);

    if (items.length === 0){
        res.statusCode = 404;
        res.json({detail: 'Order non-existent'});
        return
    }

    let specificItems = [];
    items.map(item => {    
        // insert matching order items
        if (item.transactionId.toString() === orderId){
            specificItems.push(item);
        }
    })
    res.json({
        details: order,
        items: specificItems
    });
    return 
}

const listOrders = async (req, res) =>
{   
    const userId = req.user.userId;
    console.log(req.user.userId);

    // include products later
    const orders = await OrderTransaction.find({userId: userId})

    // send number of orders per page and page number
    res.send(orders);
};

const createOrder = async (req, res) =>
{
    // create order transaction
    // include email, status, totalprice, date, street, brgy, city, and province details from ordertransaction model
    const user = await User.find({_id: req.user.userId});
    const shoppingCart = await ShoppingCart.find({userId: user._id});
    let orderTransaction;

    //create initial order
    await OrderTransaction.create(
    {
        email: user._id,
        status: 0,
        totalPrice: req.body.totalPrice,
        createdAt: DateTime.now().toJSDate(),
        street : req.body.street,
        brgy: req.body.brgy,
        city : req.body.city,
        province : req.body.province
    }).then(res => orderTransaction = res);

    shoppingCart.map(async (item) => {
        await OrderItem.create({
            transactionId: orderTransaction._id,  // refers to transaction
            productId : item.productId,     // refers to product
            quantity: item.quantity,
            price: item.price
        });
        await ShoppingCart.findByIdAndDelete(item._id);
    });

    return res.json({ transactionId: orderTransaction._id });
};

//const confirmOrder = async (req, res) => 
//{
//    const orderId = req.params.transactionId;
//    const orderStatus = req.params.status;
//
//    if (orderStatus !== 1) return res.status(405).send({ error: 'Invalid order status.' });
//    
//    const order = await OrderTransaction.findOneAndUpdate(
//        { _id: orderId }, 
//        { $set: {orderStatus: 1} },
//        { new: true }
//    );
//
//    if (!order) return res.status(404).send({ error: 'Order not found.' });
//
//    res.send(
//    {
//        message: "Order confirmed successfully.",
//        createdAt: order.createdAt,
//        orderId: order._id
//    });
// };

const cancelOrder = async (req, res) => 
{
    const ordStat = await OrderTransaction.findOneAndUpdate(
        {
            _id: req.params.orderId
        },
        {
            $set : {
                status : 2
            }
        }
    )
    return res.json({ detail: `Transaction Cancelled.`});
}

const updateOrder = async (req, res) => 
    {
        const ordStatus = await OrderTransaction.findOneAndUpdate(
            {
                _id: req.params.orderId
            },
            {
                $set : {
                    status : 1
                }
            }
        )
        return res.json({ detail: `Transaction Modified.`});
    }

export{ retrieveOrder, listOrders, createOrder, confirmOrder, cancelOrder, updateOrder};
