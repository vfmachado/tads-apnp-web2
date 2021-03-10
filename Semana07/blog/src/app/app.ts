
import express from 'express';
import session from 'express-session';

import * as bodyParser from 'body-parser';

import path from 'path';
import rootDir from '../rootDir';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('src/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(session({
    secret: 'iadsnadwkmdwqlkmnqwlkfqkmfqlkm',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('*', (req, res, next) => {
    console.log("Middleware");
    console.log({ "Base URL": req.baseUrl, "Original URL": req.originalUrl, QUERY: req.query, METHOD: req.method, "Body": req.body });
    console.log({ "Cookies": req.get('Cookie') });

    /*
    const cookie = req.get('Cookie');
    if (cookie) {
        req.body.loggedIn = true;
    } else {
        req.body.loggedIn = false;
    }
    */

    console.log({Session: req.session})

    next();
});

app.get('/', (req, res) => {
    res.render('initial', { loggedIn: req.session.data?.loggedIn, user: req.session.data?.user });
});

import UsersRoutes from '../routes/usersRoutes';
app.use('/users', UsersRoutes);

import PostsRouter from '../routes/postsRouter';
app.use('/posts', PostsRouter);


app.use((request: express.Request, response: express.Response) => {
    response.render('404', { url: request.originalUrl });
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});
