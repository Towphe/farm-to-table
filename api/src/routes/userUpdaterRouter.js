import { updateUser } from "../controllers/usersController";
import { authenticateJWT } from "../middleware/authMiddleware";

const userUpdateRouter = (app) =>{
    app.get('/authenticateJWT', authenticateJWT);
    app.patch('/updateUser', updateUser); 
};

export default userUpdateRouter;