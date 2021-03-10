import { resolve } from 'path';
import db from '../config/conexaoSqlite';

export enum UserRole {
    ADMIN = 'admin',
    REGULAR = 'regular'
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
}


export class User {

    static getAll(): Promise<IUser[]> {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM user";
            db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject();
                }

                const user: IUser[] = rows;
                
                resolve(user);
            });
        })
    }


    static add(userData: IUser): Promise<void> {

        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?);`
            db.run(sql, [userData.name, userData.email, userData.password, userData.role], (err) => {
                if (err) {
                    console.log("Erro", err);
                    reject();
                }
                resolve();
            });
        });
    }


    static getByEmail(email: string): Promise<IUser> {
        
        return new Promise<IUser>((resolve, reject) => {

            const sql = `SELECT * FROM user WHERE email = '${email}'`;

            db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject();
                }

                const user: IUser = { ...rows[0] };
                
                resolve(user);
            });

        });


    }

}