import { cancelOrder, updateOrder, rejectOrder, retrieveOrder, listOrders, listAllOrders, createOrder, confirmOrder } from "../controllers/orderController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/orders";
const adminUrl = "/api/admin";

const orderRouter = (app) =>
{
    app.get(`${baseUrl}/:orderId`, retrieveOrder);
    app.get(`${baseUrl}`, authenticateJWT, listOrders);
    app.get(`${adminUrl}/orders`, authenticateJWT, listAllOrders);
    app.patch(`${adminUrl}/orders/:orderId/confirm`, authenticateJWT, confirmOrder);
    app.patch(`${adminUrl}/orders/:orderId/reject`, authenticateJWT, rejectOrder);
    app.post(`${baseUrl}/create-order`, authenticateJWT, createOrder);
    app.post(`${baseUrl}/confirm-order`, confirmOrder);
    app.post(`${baseUrl}/confirm-order/:orderId`, cancelOrder, updateOrder);
}

export default orderRouter;