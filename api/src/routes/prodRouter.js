import { updateProduct } from "../controllers/productController";

const prodRouter = (app) => {
    app.patch('/updateProduct', updateProduct);
}

export default prodRouter