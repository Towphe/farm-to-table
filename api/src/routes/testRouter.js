import { index } from "../controllers/testController.js";

const testRouter = (app) => {
    app.get('/test', index);
}

export default testRouter;