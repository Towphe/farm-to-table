import { retrieveProduct, retrieveProducts, saveToCart } from "../controllers/productController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/product";

const productRouter = (app) =>{
    app.get(`${baseUrl}/:productId`, retrieveProduct);
    app.get(`${baseUrl}/`, retrieveProducts);
    app.post(`${baseUrl}/add-to-cart`, authenticateJWT, saveToCart)
}

export default productRouter