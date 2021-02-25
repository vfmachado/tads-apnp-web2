
import db from '../config/conexaoSqlite';

export interface IPost {
    id: number,
    title: string,
    text: string,
    publishedDate?: Date;
}

export class Post  {
    
    static save(post: IPost, callback: Function): void {
        
        if (!post.publishedDate) {
            post.publishedDate = new Date();
        }

        let sql = `INSERT INTO post (title, text, publishedDate) VALUES (?, ?, ?);`
        db.run(sql, [post.title, post.text, post.publishedDate], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
            
        });

    }

    static listAll(titleFilter: string): Promise<IPost[]> {
        
        const listagem: IPost[] = new Array();
       
        return new Promise<IPost[]>( (resolve, reject) => {
            let sql = 'SELECT * FROM post';
            if (titleFilter != 'undefined') {
                console.log("FILTRANDO")
                sql += " WHERE title LIKE '%" + titleFilter + "%';"
            }
            db.all(sql, [], (err, rows) => {
                
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