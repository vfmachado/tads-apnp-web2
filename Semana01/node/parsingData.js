const http = require('http');
const PORT = 3000;

const listaJSON = [];

const server = http.createServer((request, response) => {
    console.log("Recebi uma requisicao");

    // PAGINA INICIAL / -> LISTAR TODOS OS CONTEUDOS (JSON) DAS REQUISICOES
    if (request.url == '/' && request.method == "GET") {
        response.end(JSON.stringify(listaJSON));
    }
    
    // /ADD -> ADICIONAR O CONTEUDO NESTA LISTA
    else if (request.url == '/add' && request.method == "POST") {

        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });

        request.on('end', () => {
            console.log(data);
            listaJSON.push(JSON.parse(data));
            response.end("Dado recebido!");
        });

    }

    else {
        response.statusCode = 404;
        response.end("Unknown")
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});