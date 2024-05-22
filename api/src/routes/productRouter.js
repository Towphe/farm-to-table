import {editItems, addProduct, deleteItems, retrieveCart, retrieveProduct, retrieveProducts, saveToCart } from "../controllers/productController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/product";
const cartUrl = "/api/shopping-cart";
const adminUrl = "/api/admin";

const productRouter = (app) =>{
    app.get(`${baseUrl}/:productId`, retrieveProduct);
    app.get(`${adminUrl}/products/:productId`, retrieveProduct);
    app.get(`${baseUrl}/`, retrieveProducts);
    app.get(`${cartUrl}`, authenticateJWT, retrieveCart);
    app.delete(`${cartUrl}/:itemId`, authenticateJWT, deleteItems);
    app.post(`${cartUrl}`, authenticateJWT, saveToCart);
    app.post(`${adminUrl}/product`, authenticateJWT, addProduct);
    app.patch(`${adminUrl}/product/:productId`,authenticateJWT, editItems)
};

export default productRouter