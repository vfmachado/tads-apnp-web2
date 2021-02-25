import { NextFunction, Request, Response } from "express";

import session from 'express-session';

export default function(req: Request, res: Response, next: NextFunction): void {

    const logged = req.session.data?.loggedIn;
    if (logged) {
        console.log("O usuário está logado...");
        next();
    } else {
        console.log("NAO LOGADO!");
        res.redirect('/');
    }
}
