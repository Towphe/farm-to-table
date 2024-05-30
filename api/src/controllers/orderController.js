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

const confirmOrder = async (req, res) => {

    if (req.user.userType !== 'ADMIN'){
        res.statusCode = 403;
        res.json({detail: "Not authorized to confirm order."})
        return;
    }

    if (order.status !== 0){
        res.statusCode = 400;
        res.send({detail: 'Order no longer available for confirmation'})
        return
    }

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

const getStatusInt = (statusStr) => {
    switch(statusStr){
        case 'pending':
            return 0;
        case 'completed':
            return 1;
        case 'cancelled':
            return 2;
    }
}

const listOrdersOfUser = async (req, res) =>
{
    const p = isUndefined(req.query.p) ? 1 : parseInt(req.query.p);
    const c = isUndefined(req.query.c) ? 10 : parseInt(req.query.c);
    const filter = (req.query.filter == "" || req.query.filter.toLowerCase() == "all") ? "all" : req.query.filter;
    
    let orderCount;
    let orders;
    console.log(filter);
    if (filter == "all"){
        
        orderCount = await OrderTransaction.countDocuments({userId: req.user.userId});
        orders = await OrderTransaction.find({userId: req.user.userId}).sort({createdAt: -1}).skip((p - 1) * c).limit(c);
    } else{
        // apply filter
        orderCount = await OrderTransaction.countDocuments({userId: req.user.userId, status: getStatusInt(filter)});
        orders = await OrderTransaction.find({userId: req.user.userId, status: getStatusInt(filter)}).sort({createdAt: -1}).skip((p - 1) * c).limit(c);
    }

    const pageCount = Math.ceil(orderCount / c);

    // send number of orders per page and page number
    res.json({ orders, pages: pageCount });
};

const listAllOrders = async (req, res) => {
    // const orders = await OrderTransaction.find({});

    // res.send(orders);

    const p = isUndefined(req.query.p) ? 1 : parseInt(req.query.p);
    const c = isUndefined(req.query.c) ? 10 : parseInt(req.query.c);
    const filter = (req.query.filter == "" || req.query.filter.toLowerCase() == "all") ? "all" : req.query.filter;

    let orderCount;
    let orders;
    console.log(filter);
    if (filter == "all"){
        
        orderCount = await OrderTransaction.countDocuments({userId: req.user.userId});
        orders = await OrderTransaction.find({}).sort({createdAt: -1}).skip((p - 1) * c).limit(c);
    } else{
        // apply filter
        orderCount = await OrderTransaction.countDocuments({userId: req.user.userId, status: getStatusInt(filter)});
        orders = await OrderTransaction.find({status: getStatusInt(filter)}).sort({createdAt: -1}).skip((p - 1) * c).limit(c);
    }

    const pageCount = Math.ceil(orderCount / c);

    // send number of orders per page and page number
    res.json({ orders, pages: pageCount });
}

const createOrder = async (req, res) =>
{
    // create order transaction
    const shoppingCart = await ShoppingCart.find({userId: req.user.userId});
    let orderTransaction;

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

        // remove every product from all shopping carts
        const product = await Product.findById(item.productId);
        product.quantity -= item.quantity;
        product.save();

        if (product.quantity === 0){
            await ShoppingCart.deleteMany(
                {
                    productId: {$eq: item.productId}
                }
            ); // delete shopping cart instances having the same product
        }
    });

    return res.json({ transactionId: orderTransaction._id });
};

const cancelOrder = async (req, res) => 
{   
    const order = await OrderTransaction.findOne({_id: req.params.orderId});
    if (req.user.userType != 'ADMIN' && req.user.userId != order.userId.toString()){
        console.log("Not authorized")
        res.statusCode = 403;
        res.send({detail: 'Not authorized to reject order.'})
        return
    }

    // forbid action if order is no longer pending
    if (order.status !== 0){
        res.statusCode = 400;
        res.send({detail: 'Order no longer available for cancellation'})
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

export{ retrieveOrder, cancelOrder, listAllOrders, listOrdersOfUser, createOrder, confirmOrder, updateOrder};
