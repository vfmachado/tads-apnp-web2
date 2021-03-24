import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import session from 'express-session';
import { Image, Tag } from '../models';

import Formidable from 'formidable';
import { Op } from 'sequelize';

class UserController {

    async showInitialPage(req: Request, res: Response) {

        console.log("Requested:  ", req.query)

        let rawData: any = [];
        const images: any[] = [];

        if (req.query.search) {
            
            rawData = await Tag.findAll({where: {description: {[Op.substring]: req.query.search}}, include: Image});
           
            if (rawData.length > 0) {
                rawData[0].images.forEach((data: { dataValues: { title: string; path: string }; }) => {
                    images.push({
                        title: data.dataValues.title,
                        path: data.dataValues.path
                    })
                })
            }

        } else {
            rawData = await Image.findAll();
          
            rawData.forEach((data: { dataValues: { title: string; path: string }; }) => {
                images.push({
                    title: data.dataValues.title,
                    path: data.dataValues.path
                })
            })
        }
       
       

        res.render('initial', {
            user: req.session.data,
            images: images
        });
    }


    showProfile(req: Request, res: Response) {
        res.render('profile', {user: req.session.data});
    }

    async addImage(req: Request, res: Response) {

        const form = new Formidable({ multiples: false, uploadDir: 'src/public/uploads' });
 
        form.parse(req, (err, fields, files) => {
           
            //console.log('fields:', fields);
            //console.log('files:', files);

            const file : any = files.image;
            const path = file.path;
            let type: string = file.name;
            const newName = path + type.substring(type.lastIndexOf('.'));

            console.log(path, type)
            fs.rename(path, newName, async err => {
                //console.log(err);
                if (err) {
                    return res.json("FS ERROR");
                }                

                const tags = String(fields.tags).split(',').map(s => s.trim());
                
                const image =  await Image.create({ 
                    title: fields.title,
                    path: newName.substring(newName.lastIndexOf('\\')+1), 
                    userId: req.session.data.id})

                const tagsDB: any = [];
                for (let tag of tags) {
                    const fetchedTag = await Tag.findOne({where: {description: tag}});
                    
                    if (!fetchedTag) {
                        const createdTag = await Tag.create({description: tag});
                        tagsDB.push(createdTag);
                    } else {
                        tagsDB.push(fetchedTag);
                    }
                }

                console.log("TAGS TO ASSOCIATE", tagsDB);
                for (let tag of tagsDB) {
                    await (image as any ).addTag(tag, { through: {  }});
                };

                res.json(image);
            
            });
            
        });
    }

}


export { UserController };