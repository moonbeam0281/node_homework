import express from 'express';
import { getAllRec, addRec, deleteRec } from './handlers/recipes-handler.js';

const app = new express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"\n`);
    next();
});

app.get('/', getAllRec);

app.get('/add', (req,res) => {
    res.render("add");
});

app.post('/add', addRec);

app.post('/delete', deleteRec);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});