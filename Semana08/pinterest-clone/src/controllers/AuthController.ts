import crypto from 'crypto';
import { Request, Response } from 'express';
import session from 'express-session';
import { SendMail } from '../mail/SendMail';

import { User, UserValidator } from '../models/User';

export class AuthController {

    showSignup(req: Request, res: Response) {
        res.render('signup');
    }

    signup(req: Request, res: Response) {

        console.log(req.body);

        const validation = UserValidator.validate(req.body, { abortEarly: false });

        const errors: any = new Object()
        if (validation.error) {
            for (const error of validation.error.details) {
                errors[error.path[0]] = error.message;
            }
        }

        if (Object.keys(errors).length > 0) {
            res.render('signup', { errors: errors });
        } else {
            User.create(req.body)
                .then(async (result: any) => {

                    try {
                        await SendMail(result.email, crypto.randomBytes(6).toString('hex'));
                    } catch (error) {
                        console.log("Erro no servico de email", error);
                    }
                    res.json(result);
                })
                .catch(error => {
                    res.render('signup', { errors: { email: "Email já utilizado" } });
                })
        }

    }

    showSignin(req: Request, res: Response) {
        res.render('signin');
    }

    async signin(req: Request, res: Response) {
        
        const {email, password} = req.body;
        
        console.log(req.body);
        const user: any = await User.findOne({where: {email}})
        
        if (!user) {
            return res.json("Nao encontrado.");
        }
        
        if (user.password !== password) {
            return res.json("Senha incorreta");
        }

        req.session.data = user; 
        return res.redirect('/');

    }

    logout(req: Request, res: Response) {
        
        req.session.destroy(err => {
            console.log(err);
        });

        return res.redirect('/');

    }
}