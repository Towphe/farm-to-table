import { openProduct, showProducts } from "../controllers/productController.js";

const baseUrl = "/api/product";

const productRouter = (app) =>{
    app.get(`${baseUrl}/productInfo/:productId`, openProduct);
    app.get(`${baseUrl}/showProducts`, showProducts)
}

export default productRouter