import express from 'express';
import session from 'express-session';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));

app.use(express.static('src/public'));

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: 'minha senha segura',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));


import routes from '../routes/mainRoutes';
app.use(routes);

import databaseConfig from '../config/dbConnection';

databaseConfig.sync(
//    {force: true}
)
    .then(result => {
        //console.log(result)
        app.listen(3000, () => {
            console.log("Listening at 3000");
        });
    })
    .catch(error => {
        console.log(error)
    })


