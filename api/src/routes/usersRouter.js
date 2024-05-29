import { retrieveUsers } from "../controllers/usersController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const baseUrl = "/api/users";

const usersRouter = (app) => {
    app.get(`${baseUrl}`, authenticateJWT, retrieveUsers);
}

export default usersRouter;