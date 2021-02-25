
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { User } from '../models/User';

const userController = new UserController();

const router = Router();

router.get('/login', userController.showLoginPage);
router.post('/login', userController.auth);

router.get('/signup', userController.showSignupPage);
router.post('/signup', userController.addUser); 

export default router;