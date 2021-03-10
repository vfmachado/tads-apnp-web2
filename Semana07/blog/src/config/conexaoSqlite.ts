import sqlite from 'sqlite3';

sqlite.verbose();

const db = new sqlite.Database('./banco-blog.db', err => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Connected to the SQLite Database");
});

export default db;