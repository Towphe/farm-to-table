import { retrieveOrder, listOrders, createOrder, confirmOrder } from "../controllers/orderController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/orders";

const orderRouter = (app) =>
{
    app.get(`${baseUrl}/:orderId`, retrieveOrder);
    app.get(`${baseUrl}`, authenticateJWT, listOrders);
    app.post(`${baseUrl}/create-order`, authenticateJWT, createOrder);
    app.post(`${baseUrl}/confirm-order`, confirmOrder);
}

export default orderRouter;