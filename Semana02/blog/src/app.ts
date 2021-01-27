
import express from 'express';
import * as bodyParser from 'body-parser';
import { FakeRepository, Post } from './FakeRepository';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('*', (req, res, next) => {
    console.log("Middleware");
    console.log({"Base URL": req.baseUrl, "Original URL": req.originalUrl, QUERY: req.query, METHOD: req.method});
    next();       
});

app.get('/post', (req, res) => {
    res.end(JSON.stringify(FakeRepository.list(), null, 2));
});

app.post('/add-post', (req, res) => {

    FakeRepository.add(req.body as Post);
    console.log(req.body);
    res.end("Recebido! \n" + JSON.stringify(req.body, null, 2));;
    
});

app.get('/add-post', (req, res) => {
    res.end(`
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
        <body>
            <form method="POST">
                <input name="title" />
                <input name="text" />
                <input type="submit" value="Enviar" />
            </form>
        </body>
    </html>
    `)
});

app.use('/hello', (request: express.Request, response: express.Response) => {
    response.end("Hello from express server");
});

app.use('*', (request: express.Request, response: express.Response) => {
    response.end(`<html>
        <body>
            <h1>404!</h1>
        </body>
        </html>`);
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});
