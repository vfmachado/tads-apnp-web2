
import db from '../config/conexaoSqlite';

export interface IPost {
    id: number,
    title: string,
    text: string,
    publishedDate: Date;
}

export class Post implements IPost {
    
    id: number;
    title: string;
    text: string;
    publishedDate: Date;

    constructor(title: string, text: string, date?: Date) {
        this.id = 0;
        this.title = title;
        this.text = text;
        this.publishedDate = date ? date : new Date();
    }

    save(callback: Function): void {
        
        let sql = `INSERT INTO post (title, text, publishedDate) VALUES (?, ?, ?);`
        db.run(sql, [this.title, this.text, this.publishedDate.getTime()], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
            
        });

    }

    static listAll(): Promise<IPost[]> {
        
        const listagem: IPost[] = new Array();
       
        return new Promise<IPost[]>( (resolve, reject) => {
            db.all('SELECT * FROM post', [], (err, rows) => {
                
                rows.forEach(post => {
                    listagem.push({
                        id: post.id,
                        title: post.title,
                        text: post.text,
                        publishedDate: post.publishedDate
                    })
                
                });

                resolve(listagem);
            });
        });
    }


    static getById(id: number): Promise<IPost> {

        return new Promise<IPost>((resolve, reject) => {

            const sql = `SELECT * FROM post WHERE id = ${id}`;

            db.all(sql, (err, rows) => {
                if (err)
                    console.log(err);

                const post: IPost = {
                    ...rows[0],
                    publishedDate: new Date(rows[0].publishedDate)
                }
                resolve(post);
            });

        });

    }

    static deleteById(id: number): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            let sql = `DELETE FROM post WHERE post.id = ?;`
            db.run(sql, [id], (err) => {
                if (err) {
                    console.log("Erro", err);
                    reject(err);
                }

                resolve();
                console.log("Dado removido com sucesso! ");
            });
        });
    }


    static update(post: IPost): Promise<void> {

        return new Promise((resolve, reject) => {

            const sql = `UPDATE post
            SET title = ?, text = ?
            WHERE post.id = ?;`;

            db.run(sql, [post.title, post.text, post.id], err => {
                if (err) {
                    console.log("Erro", err);
                    reject(err);
                }

                resolve();
            })

        });

    }

}