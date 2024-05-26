import mongoose from "mongoose";
import Product from "../models/Product.js";
import OrderTransaction from "../models/OrderTransaction.js";
import OrderItem from "../models/OrderItem.js";
import {DateTime} from 'luxon';

//const lastWeek = DateTime.now().minus({days: 7}).toJSDate();


await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

// methods to do:
// 1. get list of products sold     -   w/ income and total sales
//      -- include: number of orders   -  week/month/year
// 2. get number of orders (confirmed & unconfirmed)

const retrieveBasicReport = async (req, res) => {
    let days;

    let by = req.query.by;

    let sales = [];    // initialized reports to return
    let productTally = {};
    let totalIncome = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;

    // filter base on `by`
    // join the tables: `OrderTransaction`, `OrderItem`, and `Product`
    switch (by){
        case 'week':
            days = 7;
            break;
        case 'month':
            days = 30;
            break;
        case 'year':
            days = DateTime.now().year % 4 == 0 ? 366 : 365 // checks for leap year
            break;
        default:
            days = 7;
            break;
    }

    const orders = await OrderTransaction.aggregate([
        {
            $match: {
                createdAt : {
                    $gte: DateTime.now().minus({days: days}).toJSDate()
                }
            }
        },
        {
            $lookup: {
                from: "orderitems",
                localField: "_id",
                foreignField: "transactionId",
                as: "items",
                pipeline: [
                    {
                        $lookup : {
                            from: "products",
                            localField: "productId",
                            foreignField: "_id",
                            as: "detail"
                        }
                    }
                ]
            }
        }
    ]);
    
    orders.map((order) => {
        // try to not add to tally if order was cancelled
        order.items.map((product) => {
            if (productTally[product.detail[0]._id] === undefined){
                // product not yet in tally
                productTally[product.detail[0]._id] = {
                    name: product.detail[0].name,
                    count: 1
                };
            } else{
                // product already in tally
                productTally[product.detail[0]._id].count += 1;
            }
        });

        // get order count
        if (order.status === 0){ // pending
            pendingOrders += 1
        }
        else if (order.status === 1){     // completed
            completedOrders += 1;
            totalIncome += order.totalPrice;
        }
        else if (order.status === 2){   // cancelled
            cancelledOrders += 1;
            totalIncome -= order.totalPrice;
        }
    });

    // get top 10 products
    let sortedTally = [];
    for (var product in productTally)    {
        sortedTally.push({id: product, name: productTally[product].name, count: productTally[product].count});
    }

    sortedTally.sort((a, b) => {
        return b.count - a.count;
    })

    return res.send({
        productTally: sortedTally.slice(0,10),
        orderTally: {
            pending: pendingOrders,
            completed: completedOrders,
            cancelled: cancelledOrders
        },
        income: totalIncome
    });
}

const retrieveHomepageReport = async (req, res) => {
    // const orders = await OrderTransaction.find({status: 1});
    const orders = await OrderTransaction.aggregate([
        {
            $match: {
                status: 0
            }
        },
        {
            $lookup: {
                from: "orderitems",
                localField: "_id",
                foreignField: "transactionId",
                as: "items",
                pipeline: [
                    {
                        $unwind: {path: "$orderitems", preserveNullAndEmptyArrays: true}
                    },
                    {
                        $lookup : {
                            from: "products",
                            localField: "productId",
                            foreignField: "_id",
                            as: "detail"
                        }
                    }
                ]
            }
        }
    ]);

    let productTally = {}

    orders.map((order) => {
        // map every product in order,
        // then add product to tally
        order.items.map((product) => {
            if (productTally[product.detail[0]._id] === undefined){
                // product not yet in tally
                productTally[product.detail[0]._id] = {
                    name: product.detail[0].name,
                    count: 1
                };
            } else{
                // product already in tally
                productTally[product.detail[0]._id].count += 1;
            }
        });
    });

    let sortedTally = [];
    for (var product in productTally)    {
        sortedTally.push({id: product, name: productTally[product].name, count: productTally[product].count});
    }

    return res.send({
        pendingCount: orders.length,
        topProducts: sortedTally.slice(0, 5)
    });
}

export {retrieveBasicReport, retrieveHomepageReport};