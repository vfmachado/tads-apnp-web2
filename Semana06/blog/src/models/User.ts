import db from '../config/conexaoSqlite';

export interface IUser {
    name: string,
    email: string,
    password: string
}


export class User {

    static add(userData: IUser): Promise<void> {

        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO user (name, email, password) VALUES (?, ?, ?);`
            db.run(sql, [userData.name, userData.email, userData.password], (err) => {
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
                if (err)
                    console.log(err);

                const user: IUser = { ...rows[0] };
                
                resolve(user);
            });

        });


    }

}