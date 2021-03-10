import { Request, Response } from "express";
import { IUser, User, UserRole } from "../models/User";

import bcrypt from 'bcrypt';

import session from 'express-session'

export class UserController {

    async listUsers(req: Request, res: Response) {
        const users = await User.getAll();
        res.json(users);
    }

    showSignupPage(req: Request, res: Response) {
        res.render('users/signupForm');
    }

    showLoginPage(req: Request, res: Response) {
        res.render('users/loginForm');
    }

    async addUser(req: Request, res: Response) {

        try {
            const newUser = req.body as IUser;

            const hash = await bcrypt.hash(newUser.password, 10);
            console.log(hash);

            newUser.password = hash;
            newUser.role = UserRole.REGULAR;

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

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            //res.setHeader('Set-Cookie', 'PostifLoggedIn=true; Path=/');
            req.session.data = {
                loggedIn: true,
                user: user
            }
            res.redirect('/');
        } else {
            res.json("nao identificado")
        }
    }

}