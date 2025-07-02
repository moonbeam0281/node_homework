import express, { json } from 'express';
const app = express();
import recpRoute from './routes/recipes.js';

app.use(json());
app.use('/recipes', recpRoute);
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
