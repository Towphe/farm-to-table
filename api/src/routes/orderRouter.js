import { cancelOrder, updateOrder, findOrder, listOrders, createOrder, confirmOrder, updateOrder } from "../controllers/orderController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/order";

const orderRouter = (app) =>
{
    app.get(`${baseUrl}/:orderId`, findOrder);
    app.get(`${baseUrl}/ordered-items`, listOrders);
    app.post(`${baseUrl}/create-order`, authenticateJWT, createOrder);
    app.post(`${baseUrl}/confirm-order`, confirmOrder);
    app.post(`${baseUrl}/confirm-order/:orderId`, cancelOrder, updateOrder);
}

export default orderRouter;