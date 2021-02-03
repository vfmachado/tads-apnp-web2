import { Request, Response } from 'express';

import path from 'path';
import rootDir from '../rootDir';
import { Post } from '../models/Post';


export class PostController {

    list(req: Request, res: Response): void {
        const posts = Post.listAll();
        res.render('listPosts', {posts});
    }

    detailtByID(req: Request, res: Response): void {
        try {
            const id = Number(req.params.indice);
            
            if (id >= 0 && id < Post.listAll().length) {
                const post = Post.listAll()[id];
                res.render('detailPost', { post })
            } else
                throw Error();
        } catch (error) {
            res.status(404).render('404');
        }
    }

    add(req: Request, res: Response): void {
        
        const {title, text} = req.body;
        const post = new Post(title, text);
        
        post.save();

        res.end("Recebido! \n" + JSON.stringify(req.body, null, 2));;
    }

    showAddPage(req: Request, res: Response): void {
        const caminhoAbs = path.join(rootDir, 'views', 'add-post.html');
        res.sendFile(caminhoAbs);
    }

}