import { NextFunction, Request, Response } from "express";

import session from 'express-session';
import { UserRole } from "../models/User";

function isAuth(req: Request, res: Response, next: NextFunction): void {

    const logged = req.session.data?.loggedIn;
    if (logged) {
        console.log("O usuário está logado...");
        next();
    } else {
        console.log("NAO LOGADO!");
        res.redirect('/');
    }
}

function checkRole(role: UserRole) {

    return (req: Request, res: Response, next: NextFunction) => {
        if (req.session.data?.user.role == role) return next();

        return res.status(403).json("NOT ALLOWED");
    }

}

export {
    isAuth,
    checkRole
}