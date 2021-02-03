/*
    LIST
    ADD
    UPDATE
    DELETE
*/

import { Router } from 'express';

const router = Router();

import { PostController } from '../controllers/PostController';
const postController = new PostController();


router.get('/', postController.list);

router.get('/add', postController.showAddPage);

router.post('/add', postController.add);

router.get('/:indice', postController.detailtByID);


export default router;