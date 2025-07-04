import express, { json } from 'express';
import { getBooks, addBook } from './handlers/bookHandler.js';
import { checkBook } from './middleware/checkBook.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"\n`);
    next();
});

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/books', getBooks);
app.post('/books', checkBook, addBook);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
})