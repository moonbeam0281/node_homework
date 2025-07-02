const form = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');

const darkToggle = document.getElementById('darkModeToggle');

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkToggle.textContent = isDark ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});


async function fetchRecipes() {
  const res = await fetch('/recipes');
  const data = await res.json();
  recipeList.innerHTML = '';
  data.forEach(recipe => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${recipe.name}</strong><br>
      <em>${recipe.description}</em><br>
      <button onclick="deleteRecipe('${recipe.name}')">Delete</button>
      <button onclick='editRecipe(${JSON.stringify(recipe)})'>Edit</button>
    `;
    recipeList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const ingredientsRaw = document.getElementById('ingredients').value.trim().split('\n');
  const stepsRaw = document.getElementById('steps').value.trim().split('\n');
  const cookingTime = parseInt(document.getElementById('cookingTime').value) || 0;
  const difficulty = document.getElementById('difficulty').value;

  const ingredients = ingredientsRaw.map(line => {
    const [name, amount, unit] = line.split(',').map(s => s.trim());
    return { name, amount: parseFloat(amount), unit };
  });

  const recipe = { name, description, ingredients, steps: stepsRaw, cookingTime, difficulty };

  await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });

  form.reset();
  fetchRecipes();
});

async function deleteRecipe(name) {
  await fetch(`/api/recipes/${encodeURIComponent(name)}`, { method: 'DELETE' });
  fetchRecipes();
}

function editRecipe(recipe) {
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('editName').value = recipe.name;
  document.getElementById('editDescription').value = recipe.description || '';
  document.getElementById('editIngredients').value = recipe.ingredients.map(i => `${i.name},${i.amount},${i.unit}`).join('\n');
  document.getElementById('editSteps').value = recipe.steps.join('\n');
  document.getElementById('editCookingTime').value = recipe.cookingTime || 0;
  document.getElementById('editDifficulty').value = recipe.difficulty || '';
}

function closeEdit() {
  document.getElementById('editModal').style.display = 'none';
}

async function submitEdit() {
  const name = document.getElementById('editName').value;
  const description = document.getElementById('editDescription').value;
  const ingredientsRaw = document.getElementById('editIngredients').value.trim().split('\n');
  const stepsRaw = document.getElementById('editSteps').value.trim().split('\n');
  const cookingTime = parseInt(document.getElementById('editCookingTime').value) || 0;
  const difficulty = document.getElementById('editDifficulty').value;

  const ingredients = ingredientsRaw.map(line => {
    const [name, amount, unit] = line.split(',').map(s => s.trim());
    return { name, amount: parseFloat(amount), unit };
  });

  const updatedRecipe = { name, description, ingredients, steps: stepsRaw, cookingTime, difficulty };

  await fetch(`/recipes/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRecipe)
  });

  closeEdit();
  fetchRecipes();
}

fetchRecipes();