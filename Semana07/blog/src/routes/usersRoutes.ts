
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { User, UserRole } from '../models/User';

import { isAuth, checkRole } from '../middlewares/isAuth';

const userController = new UserController();

const router = Router();

router.get('/login', userController.showLoginPage);
router.post('/login', userController.auth);

router.get('/signup', userController.showSignupPage);
router.post('/signup', userController.addUser); 

router.get('/', isAuth, checkRole(UserRole.ADMIN), userController.listUsers);
 
export default router;