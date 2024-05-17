import { confirmOrder } from "../controllers/orderController";

const orderRouter = (app) => {
    app.post('/confirmOrder', confirmOrder);
}

export default orderRouter;