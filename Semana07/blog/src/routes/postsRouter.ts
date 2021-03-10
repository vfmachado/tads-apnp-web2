/*
    LIST
    ADD
    UPDATE
    DELETE
*/

import { NextFunction, Router, Request, Response } from 'express';
import { isAuth, checkRole } from '../middlewares/isAuth';

import session from 'express-session';

const router = Router();

import { PostController } from '../controllers/PostController';
import { User, UserRole } from '../models/User';
import { Post } from '../models/Post';
const postController = new PostController();

const checkUserPostOrAdmin = (req: Request, res: Response, next: NextFunction) => {

    if (req.session.data.user.role == UserRole.ADMIN) next();

    const id = Number(req.params.id);

    Post.getById(id)
    .then(post => {
        if (post.user_id == req.session.data.user.id)
            next();
        else
            return res.status(403).json("NOT ALLOWED")     
    })
    .catch(error => {
        console.log(error);
        
    })

}

router.get('/', isAuth, postController.list);

router.get('/add', isAuth, postController.showAddPage);
 
router.post('/add', isAuth, postController.add);

router.get('/update/:id', isAuth, checkUserPostOrAdmin, postController.showUpdatePage);
router.post('/update/:id',  isAuth, checkUserPostOrAdmin, postController.updateByID);

router.get('/delete/:id',  isAuth, checkUserPostOrAdmin, postController.deleteByID);

router.get('/:id', postController.detailtByID);


export default router;