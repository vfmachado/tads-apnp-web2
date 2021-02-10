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

    async showUpdatePage(req: Request, res: Response): Promise<void> {
        
        try {
            const id = Number(req.params.id);
            const post = await Post.getById(id);
            res.render('updatePost', { post })
          
        } catch (error) {
            res.status(404).render('404');
        }
         
    }


    async updateByID(req: Request, res: Response): Promise<void> {
        
        try {
            const id = Number(req.params.id);
            const post = await Post.getById(id);

            post.title = req.body.title;
            post.text = req.body.text;

            await Post.update(post); 
            res.redirect('/posts');


        } catch (error) {
            res.status(404).render('404');
        }
        
    }


    async deleteByID(req: Request, res: Response): Promise<void> {
        
        try {
            const id = Number(req.params.id);
            await Post.deleteById(id);
            
            res.redirect('/posts');
          
        } catch (error) {
            res.status(404).render('404');
        }
        
    }

    add(req: Request, res: Response): void {
        
        const post = req.body;
        Post.save(post, () => {
            res.redirect('/posts');
        });

    }

    showAddPage(req: Request, res: Response): void {
        const caminhoAbs = path.join(rootDir, 'views', 'add-post.html');
        res.sendFile(caminhoAbs);
    }

}   