import http from 'http';
import url from 'url';
import {
    add,
    subtract,
    multiply,
    divide,
    power,
    modulo
} from './calculator.js';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/') {
        // Serve form
        res.setHeader('Content-Type', 'text/html');
        res.end(`
    <html>
      <head><title>Calculator</title></head>
      <body>
        <h2>Simple Calculator</h2>
        <form method="GET" action="/calculate">
          <input type="number" name="a" placeholder="First number" required />
          <input type="number" name="b" placeholder="Second number" required />
          <select name="operation">
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (*)</option>
            <option value="divide">Divide (/)</option>
            <option value="power">Power (^)</option>
            <option value="modulo">Modulo (%)</option>
          </select>
          <button type="submit">Calculate</button>
        </form>
      </body>
    </html>
  `);
        return;
    }

    if (pathname === '/calculate' && query.operation && query.a !== undefined && query.b !== undefined) {
        // Handle calculation
        const a = parseFloat(query.a);
        const b = parseFloat(query.b);
        let result;

        switch (query.operation) {
            case 'add': result = add(a, b); break;
            case 'subtract': result = subtract(a, b); break;
            case 'multiply': result = multiply(a, b); break;
            case 'divide': result = divide(a, b); break;
            case 'power': result = power(a, b); break;
            case 'modulo': result = modulo(a, b); break;
            default: result = 'Unknown operation';
        }

        res.setHeader('Content-Type', 'text/html');
        res.end(`
    <html>
      <body>
        <p><strong>Result:</strong> ${result}</p>
        <a href="/">Back</a>
      </body>
    </html>
  `);
        return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
