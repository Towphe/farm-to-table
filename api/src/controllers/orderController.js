import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_KEY, 
{
    useNewUrlParser: true, useUnifiedTopology: true
});

// order schema
const OrderTransaction = mongoose.model('Order',
{
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
const OrderItem = mongoose.model('OrderItem',
{
    transactionId: String,  // refers to transaction
    productId : String,     // refers to product
    quantity: Number,
    price: Number
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

Create order:
* import body ng OrderTransaction then post sa website yung request
*/

const findOrder = async (req, res) =>
{
    // find matching orders. Use productId to double check
    const ord = await OrderItem.findById(req.params.transactionId);
    const prod = await OrderItem.findById(req.params.productId);
    
    if (!(ord && prod))
        return res.status(404).json({ message: 'Order not found.' });

    res.send(ord, prod);
};

const listOrders = async (req, res) =>
{
    const pg = isUndefined(req.query.pg) ? 1 : req.query.pg; // page number: if undefined pg, set to 1. Else, get value of pg
    const cnt = isUndefined(req.query.cnt) ? 10 : req.query.cnt; // number of orders per page: if undefined cnt, set to 10. Else, get value of cnt

    const ord_Cnt = OrderItem.length; // get length of the orderItem model array.
    const pg_Cnt = Math.floor(ord_Cnt / cnt) + 1; // get number of pages and add extra page for remaining orders

    // noted na walang magsiskip na orders sa page 1 kaya bawas ng 1 sa pg const e.g., (1 - 1) * 10 => 0 orders to skip for page 1
    // skip the first 10 orders... so on and so forth e.g., (2 - 1) * 10 => 10 orders to skip for page 2... so on and so forth
    // limit 10 orders per page
    const ords = await OrderItem.find().skip((pg - 1) * cnt).limit(cnt);

    // send number of orders per page and page number
    res.send(
    {
        orders: ords,
        pages: pg_Cnt
    });
};

const createOrder = async (req, res) =>
{
    // create order transaction
    // include email, status, totalprice, date, street, brgy, city, and province details from ordertransaction model
    await OrderTransaction.create(
    {
        email: req.body.email,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        createdAt: req.body.createdAt,
        street : req.body.street,
        brgy: req.body.brgy,
        city : req.body.city,
        province : req.body.province
    });

    return res.json({ message: 'Order Created.'});
};

const confirmOrder = async (req, res) => 
{
    const orderId = req.params.transactionId;
    const orderStatus = req.params.status;

    if (orderStatus !== 1) return res.status(405).send({ error: 'Invalid order status.' });
    
    const order = await OrderTransaction.findOneAndUpdate(
        { _id: orderId }, 
        { $set: {orderStatus: 1} },
        { new: true }
    );

    if (!order) return res.status(404).send({ error: 'Order not found.' });

    res.send(
    {
        message: "Order confirmed successfully.",
        createdAt: order.createdAt,
        orderId: order._id
    });
};

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

export{ findOrder, listOrders, createOrder, confirmOrder, cancelOrder, updateOrder};