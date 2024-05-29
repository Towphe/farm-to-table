import { viewUser } from '../controllers/usersController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js'

const baseUrl = "/api/users";

const userRouter = (app) =>{
    app.get(`${baseUrl}`, authenticateJWT, viewUser); 
};

export default userRouter;