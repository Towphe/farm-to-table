import { index, testUpload, testDeleteFolder } from "../controllers/testController.js";

const testRouter = (app) => {
    app.get('/test', index);
    app.post('/test-upload/:productId', testUpload);
    app.delete('/test-delete-directory/:productId', testDeleteFolder);
}

export default testRouter;