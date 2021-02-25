import { Request, Response } from "express";
import { IUser, User } from "../models/User";

import session from 'express-session'

export class UserController {

    showSignupPage(req: Request, res: Response) {
        res.render('users/signupForm');
    }

    showLoginPage(req: Request, res: Response) {
        res.render('users/loginForm');
    }

    async addUser(req: Request, res: Response) {

        try {
            const newUser = req.body as IUser;
            await User.add(newUser);
            res.send("OK");
        } catch (error) {
            console.log(error);
            res.send("Ooopps")
        }
    }

    async auth(req: Request, res: Response) {
        
        const { email, password } = req.body;
        const user = await User.getByEmail(email);

        if (password == user.password) {
            //res.setHeader('Set-Cookie', 'PostifLoggedIn=true; Path=/');
            req.session.data = {
                loggedIn: true,
                user: email
            }
            res.redirect('/');
        } else {
            res.json("nao identificado")
        }
    }

}