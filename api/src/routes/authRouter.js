import { signup, signin, test, refreshToken, signOut } from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/auth";

const authRouter = (app) => {
    app.post(`${baseUrl}/sign-up`, signup);
    app.post(`${baseUrl}/sign-in`, signin)
    app.post(`${baseUrl}/refresh`, refreshToken);
    app.get(`${baseUrl}/test`, authenticateJWT, test);
    app.post(`${baseUrl}/sign-out`, signOut);
};

export default authRouter;