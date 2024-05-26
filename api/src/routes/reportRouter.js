
import { retrieveBasicReport, retrieveHomepageReport } from "../controllers/reportsController.js";

const baseUrl = "/api/reports";

const reportRouter = (app) => {
    app.get(`${baseUrl}/basic`, retrieveBasicReport);
    app.get(`${baseUrl}/admin-home`, retrieveHomepageReport)
}

export default reportRouter;