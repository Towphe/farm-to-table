import { retrieveProduct, retrieveProducts } from "../controllers/productController.js";

const baseUrl = "/api/product";

const productRouter = (app) =>{
    app.get(`${baseUrl}/:productId`, retrieveProduct);
    app.get(`${baseUrl}/`, retrieveProducts);
}

export default productRouter