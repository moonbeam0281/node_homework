import express, { json } from 'express'
import { getTextField, getTextAnalisis } from './controller/analysis.js';


const app = new express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"\n`);
    next();
});


app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/analyze', getTextField);

app.post('/analyze', getTextAnalisis);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});