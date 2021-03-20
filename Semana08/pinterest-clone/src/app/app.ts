import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));

app.use(express.static('src/public'));

app.get('/', (req, res) => {
    res.render('initial');
});


app.listen(3000, () => {
    console.log("Listening at 3000");
});
