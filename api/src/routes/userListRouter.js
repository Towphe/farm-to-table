import { viewUser } from '../controllers/usersController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js'

const userListRouter = (app) =>{
    app.get('/authenticateJWT', authenticateJWT);
    app.get('/viewUser', viewUser); 
};

export default userListRouter;