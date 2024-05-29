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
    const orderId = req.params.orderId;
    
    const order = await OrderTransaction.findOneAndUpdate(
        {
            _id: orderId},
        {
            $set: {
                status: 1
            }
        });

    res.send({ message: "Order confirmed successfully." });
};

// const rejectOrder = async (req, res) => {
//     const orderId = req.params.orderId;
    
//     const order = await OrderTransaction.findOneAndUpdate(
//         {
//             _id: orderId},
//         {
//             $set: {
//                 status: 2
//             }
//         });

//     res.send({ message: "Order rejected successfully." });
// };

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
    // include products later
    const orders = await OrderTransaction.find({
        userId: req.user.userId
    });

    // send number of orders per page and page number
    res.send(orders);
};

const listAllOrders = async (req, res) => {
    // const orders = await OrderTransaction.find({});

    // res.send(orders);

    const p = isUndefined(req.query.p) ? 1 : parseInt(req.query.p);
    const c = isUndefined(req.query.c) ? 10 : parseInt(req.query.c);
    const status = req.query.sort || 'all'; // filter by status later

    try {
        const orderTransaction = await OrderTransaction.countDocuments({});
        const pageCount = Math.ceil(orderTransaction / c);

        const orders = await OrderTransaction.find({}).skip((p - 1) * c).limit(c);
        
        res.json({ orders, pages: pageCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const createOrder = async (req, res) =>
{
    // create order transaction
    // include email, status, totalprice, date, street, brgy, city, and province details from ordertransaction model
    // const user = await User.find({_id: req.user.userId});
    const shoppingCart = await ShoppingCart.find({userId: req.user.userId});
    let orderTransaction;
    console.log(req.user.userId);
    //create initial order
    await OrderTransaction.create(
    {
        userId: req.user.userId,
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
        const product = await Product.findById(item.productId);
        product.quantity -= item.quantity;
        product.save();
    });

    return res.json({ transactionId: orderTransaction._id });
};

const cancelOrder = async (req, res) => 
{   
    const order = await OrderTransaction.findOne({_id: req.params.orderId});
    
    if (req.userType != 'ADMIN' && req.user.userId != order.userId.toString()){
        console.log("Not authorized")
        res.statusCode = 403;
        res.send({detail: 'Not authorized to reject order.'})
        return
    }
    order.status = 2;
    order.save();

    const items = await OrderItem.find({transactionId: req.params.orderId});
    items.map(async (item) => {
        let product = await Product.findById(item.productId);
        product.quantity += item.quantity;
        product.save();
    });

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

export{ retrieveOrder, cancelOrder, listAllOrders, listOrders, createOrder, confirmOrder, updateOrder};
