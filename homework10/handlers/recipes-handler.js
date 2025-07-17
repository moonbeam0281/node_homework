import {read, write} from "./read-write.js";

const FILE = "./handlers/recipes.json";

export async function getAllRec(req, res)
{
    try
    {
        const recp = await read(FILE);
        res.render("index", {recp});
    }
    catch(e)
    {
        console.log(`Error while getting recipes:\n${e}`);
        res.status(500).send("Error getting recipes", e,toString());
    }
};

export async function addRec(req, res) {
  try {
    const recp = await read(FILE);
    const body = req.body;

    const ingredients = {};
    if (Array.isArray(body.ingredientName)) {
      for (let i = 0; i < body.ingredientName.length; i++) {
        ingredients[body.ingredientName[i]] = body.ingredientValue[i];
      }
    } else {
      ingredients[body.ingredientName] = body.ingredientValue;
    }

    const method = {};
    const steps = Array.isArray(body.methodStep) ? body.methodStep : [body.methodStep];
    steps.forEach((step, index) => {
      method[`step${index + 1}`] = step;
    });

    const newRecipe = {
      id: Number(Date.now()),
      recipe: body.recipe,
      ingredients,
      method
    };

    recp.push(newRecipe);
    await write(FILE, recp);
    res.redirect('/');
  } catch (e) {
    console.log(`Error while adding recipe:\n${e}`);
    res.status(500).send("Error while adding recipe");
  }
}

export async function deleteRec(req, res) {
  try
  {
    const toDelId = Number(req.body.id);
    let recp = await read(FILE);

    recp = recp.filter(x => x.id !== toDelId);

    await write(FILE, recp);
    await res.redirect('/');
  }
  catch(e)
  {
    console.log(`Error while deleting recipe:\n${e}`);
    res.status(500).send("Error while deleting recipe");
  }
}