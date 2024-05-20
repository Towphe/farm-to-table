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
    // const validBy = ['week', 'month', 'year']
    let days;

    // ISSUE HERE
    let by = req.query.by;
    console.log(req.query.by);
    console.log(by);

    let sales = [];    // initialized reports to return
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
        // get total price
        totalIncome += order.totalPrice;

        // get order count
        if (order.status === 0) pendingOrders += 1    // pending
        else if (order.status === 1) completedOrders += 1     // completed
        else if (order.status === 2) cancelledOrders += 1     // cancelled
    });

    return res.send({
        orders: orders,
        orderCount: {
            pendingOrders: pendingOrders,
            completedOrders: completedOrders,
            cancelledOrders: cancelledOrders
        },
        income: totalIncome
    });
}

export {retrieveBasicReport};