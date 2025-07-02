import { Router } from 'express';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../data/recipes.json');

function getRecipes() {
  if (!existsSync(filePath)) return [];
  const data = readFileSync(filePath);
  return JSON.parse(data);
}

function saveRecipes(recipes) {
  writeFileSync(filePath, JSON.stringify(recipes, null, 2));
}

router.get('/', (req, res) => {
  const recipes = getRecipes();
  console.log(`All recepies were requested.`);
  res.json(recipes);
});

router.get('/:name', (req, res) => {
  const recipes = getRecipes();
  const recipe = recipes.find(x => x.name.toLowerCase() === req.params.name.toLowerCase());
  if (!recipe) {
    console.log(`Request for specific recipe not found!\nRecipe name: ${recipe}`)
    return res.status(404).json({ error: 'Recipe not found' });
  }
  console.log(`Request for specific recipie: ${recipe}`);
  res.json(recipe);
});

router.post('/', (req, res) => {
  const newRecipe = req.body;
  const recipes = getRecipes();
  recipes.push(newRecipe);
  saveRecipes(recipes);
  console.log(`New recipie added!\n${newRecipe}`);
  res.status(201).json({ message: 'Recipe added!', recipe: newRecipe });
});

router.put('/:name', (req, res) => {
  const recipes = getRecipes();
  const index = recipes.findIndex(x => x.name.toLowerCase() === req.params.name.toLowerCase());

  if (index === -1) return res.status(404).json({ error: 'Recipe not found' });

  recipes[index] = req.body;
  saveRecipes(recipes);
  res.json({ message: 'Recipe updated!', recipe: recipes[index] });
});

router.delete('/:name', (req, res) => {
  const recipes = getRecipes();
  const toDelRec = req.params.name;
  const filtered = recipes.filter(x => x.name.toLowerCase() !== toDelRec.toLowerCase());

  if (filtered.length === recipes.length) {
    console.log(`Could not find recipe:\n${toDelRec}`);
    return res.status(404).json({ error: 'Recipe not found' });
  }
  console.log(`The recipe:"${toDelRec}" was deleted.`);
  saveRecipes(filtered);
  res.json({ message: 'Recipe deleted!' });
});


export default router;