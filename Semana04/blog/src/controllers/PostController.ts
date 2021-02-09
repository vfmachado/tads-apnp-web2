import { Request, Response } from 'express';

import path from 'path';
import rootDir from '../rootDir';
import { Post } from '../models/Post';


export class PostController {

    async list(req: Request, res: Response): Promise<void> {

        try {
            const posts = await Post.listAll();
            res.render('listPosts', {posts});
        } catch(error) {
            console.log("Error", error)
        }
        
        /*
        Post.listAll()
            .then(posts => {
                res.render('listPosts', {posts});   
            })
            .catch(error => {
                console.log("Error", error);
            });
        */
    }

    async detailtByID(req: Request, res: Response): Promise<void> {
        
        try {
            const id = Number(req.params.id);
            const post = await Post.getById(id);
            res.render('detailPost', { post })
          
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