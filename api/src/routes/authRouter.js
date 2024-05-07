import { signup, signin, test } from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/auth";

const authRouter = (app) => {
    app.post(`${baseUrl}/sign-up`, signup);
    app.post(`${baseUrl}/sign-in`, signin)
    app.get(`${baseUrl}/test`, authenticateJWT, test);
}

export default authRouter;