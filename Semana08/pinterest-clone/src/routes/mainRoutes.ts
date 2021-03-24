import { Request, Response, NextFunction, Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserController } from '../controllers/UserController';

const isAuth = function(req: Request, res: Response, next: NextFunction) {
    if (req.session.data)
        next();
    else 
        res.redirect('/');
}

const router = Router();

const authController = new AuthController();
const userController = new UserController();

router.get('/', userController.showInitialPage); 

router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup); 

router.get('/signin', authController.showSignin); 
router.post('/signin', authController.signin); 
 
router.get('/logout', authController.logout); 
 
router.get('/profile', isAuth, userController.showProfile); 

router.post('/addImage', isAuth, userController.addImage); 

export default router;