const http = require('http');

const requests = [];

const server = http.createServer((request, response) => {

    if (request.url == '/') {
        return response.end("Requests: \n" + JSON.stringify(requests, 2));
    }

    if (request.url.startsWith('/fat')) {
        console.log(request.url)
        let number = request.url.split('?')[1];
        console.log(request.url.split('?'));
        return response.end("Calculando fatorial de " + number);
    }
    

    if (request.url != '/favicon.ico') {
        requests.push(request.url);
        
        return response.end("Reposta do servidor. URL ADICIONADA");
    }

   

});

server.listen(3000);
