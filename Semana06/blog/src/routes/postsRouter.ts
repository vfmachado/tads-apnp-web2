/*
    LIST
    ADD
    UPDATE
    DELETE
*/

import { Router } from 'express';
import isAuth from '../middlewares/isAuth';

const router = Router();

import { PostController } from '../controllers/PostController';
const postController = new PostController();


router.get('/', postController.list);

router.get('/add', isAuth, postController.showAddPage);
 
router.post('/add', isAuth, postController.add);

router.get('/update/:id', postController.showUpdatePage);
router.post('/update/:id', postController.updateByID);

router.get('/delete/:id', postController.deleteByID);

router.get('/:id', postController.detailtByID);


export default router;