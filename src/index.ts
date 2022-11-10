import http from 'http';
import url from 'url';
import { program } from 'commander';
import * as dotenv from 'dotenv';
dotenv.config();

program.option('-up, --userport <char>').option('-ay, --ayuda');
program.parse();

const { userport, ayuda } = program.opts();
console.log({ userport }, { ayuda });
if (ayuda) {
    console.log('Escribe -up o --userport seguido del número del puerto');
}

const port = process.env.PORT || 3400;
const server = http.createServer((request, response) => {
    const queryObject = url.parse(request.url as string, true).query;

    const sum = Number(queryObject.num1) + Number(queryObject.num2);
    const sub = Number(queryObject.num1) - Number(queryObject.num2);
    const mult = Number(queryObject.num1) * Number(queryObject.num2);
    const div = Number(queryObject.num1) / Number(queryObject.num2);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    if (url.parse(request.url as string, true).pathname !== '/index.js') {
        return response.write('<p>Error 404 - Pagina no encontrada</p>');
    } else if (!Number(queryObject.num1) || !Number(queryObject.num2)) {
        return response.write('<p>Por favor ingresa un parametro valido</p>');
    } else {
        response.write('<h2>Calculator</h2>');
        response.write(
            `<p>${queryObject.num1} + ${queryObject.num2} = ${sum}</p>`
        );
        response.write(
            `<p>${queryObject.num1} - ${queryObject.num2} = ${sub}</p>`
        );
        response.write(
            `<p>${queryObject.num1} * ${queryObject.num2} = ${mult}</p>`
        );
        response.write(
            `<p>${queryObject.num1} / ${queryObject.num2} = ${div}</p>`
        );
        response.end();
    }
});
server.listen(port);
