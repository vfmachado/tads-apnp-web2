
import express from 'express';
import * as bodyParser from 'body-parser';

import path from 'path';
import rootDir from '../rootDir';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('src/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use('*', (req, res, next) => {
    console.log("Middleware");
    console.log({"Base URL": req.baseUrl, "Original URL": req.originalUrl, QUERY: req.query, METHOD: req.method});
    next();       
});

import PostsRouter from '../routes/postsRouter';
app.use('/posts', PostsRouter);


app.use((request: express.Request, response: express.Response) => {
    response.render('404', {url: request.originalUrl});
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});
