
import { retrieveBasicReport } from "../controllers/reportsController.js";

const baseUrl = "/api/reports";

const reportRouter = (app) => {
    app.get(`${baseUrl}/basic`, retrieveBasicReport);
}

export default reportRouter;