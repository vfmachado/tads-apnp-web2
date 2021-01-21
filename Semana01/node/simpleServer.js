const http = require('http');

const server = http.createServer((request, response) => {
    console.log("Recebi uma requisicao");

    const {url, method } = request;
    console.log(url, method);

    console.log(request)

    response.statusCode = 200;
    response.write(`Requisicao do tipo ${method} para ${url} foi feita com sucesso.`)
    response.end();
});

server.listen(3000, '127.0.0.1', () => {
    console.log("Server listening on 3000.")
});