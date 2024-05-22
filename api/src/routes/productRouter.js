import { deleteItems, retrieveCart, retrieveProduct, retrieveProducts, saveToCart } from "../controllers/productController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/product";
const cartUrl = "/api/shopping-cart";
const adminUrl = "/api/admin/products";

const productRouter = (app) =>{
    app.get(`${baseUrl}/:productId`, retrieveProduct);
    app.get(`${baseUrl}/`, retrieveProducts);
    app.get(`${cartUrl}`, authenticateJWT, retrieveCart);
    app.delete(`${cartUrl}/:itemId`, authenticateJWT, deleteItems);
    app.post(`${cartUrl}`, authenticateJWT, saveToCart);
};

export default productRouter