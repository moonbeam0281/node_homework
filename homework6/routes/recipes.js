import { Router } from 'express';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../data/recipes.json');

const router = Router();

async function getRecipes() {
  if (!existsSync(filePath)) return [];
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function saveRecipes(recipes) {
  await writeFile(filePath, JSON.stringify(recipes, null, 2));
}

router.get('/', async (req, res) => {
  const recipes = await getRecipes();
  console.log(`All recepies were requested.`);
  res.json(recipes);
});

router.get('/:name', async (req, res) => {
  const recipes = await getRecipes();
  const recipe = recipes.find(x => x.name.toLowerCase() === req.params.name.toLowerCase());
  if (!recipe) {
    console.log(`Request for specific recipe not found!\nRecipe name: ${recipe}`)
    return res.status(404).json({ error: 'Recipe not found' });
  }
  console.log(`Request for specific recipie: ${recipe}`);
  res.json(recipe);
});

router.post('/', async (req, res) => {
  const newRecipe = req.body;
  const recipes = await getRecipes();
  recipes.push(newRecipe);
  await saveRecipes(recipes);
  console.log(`New recipie added!\n${newRecipe}`);
  res.status(201).json({ message: 'Recipe added!', recipe: newRecipe });
});

router.put('/:name', async (req, res) => {
  const recipes = await getRecipes();
  const index = recipes.findIndex(x => x.name.toLowerCase() === req.params.name.toLowerCase());

  if (index === -1) return res.status(404).json({ error: 'Recipe not found' });

  recipes[index] = req.body;
  await saveRecipes(recipes);
  res.json({ message: 'Recipe updated!', recipe: recipes[index] });
});

router.delete('/:name', async (req, res) => {
  const recipes = await getRecipes();
  const toDelRec = req.params.name;
  const filtered = recipes.filter(x => x.name.toLowerCase() !== toDelRec.toLowerCase());

  if (filtered.length === recipes.length) {
    console.log(`Could not find recipe:\n${toDelRec}`);
    return res.status(404).json({ error: 'Recipe not found' });
  }
  console.log(`The recipe:"${toDelRec}" was deleted.`);
  await saveRecipes(filtered);
  res.json({ message: 'Recipe deleted!' });
});


export default router;