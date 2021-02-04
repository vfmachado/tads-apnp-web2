const fetch = require('node-fetch');

fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:144934013X')
.then(ok => {
    return ok.json();
})
.then(json => {
    console.log(JSON.stringify(json, null, 2));
})
.catch(error => {
    console.log(error);
});

console.log("OK!!!");

