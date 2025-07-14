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

export async function addRec(req, res)
{
    try{
        const recp = await read(FILE);
        const toAdd = req.body;
        recp.push(toAdd);
        await write(FILE, recp);
    }
    catch(e){
        console.log(`Error while adding recipe:\n${e}`);
        res.status(500).send("Error while adding recipe", e,toString());
    }
}