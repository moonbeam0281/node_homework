import { MongoClient } from "mongodb";

const uri = "mongodb+srv://moonbeam:moonbeam@cluster0.tya8wfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const users = client.db("db4548").collection("users");

        console.log("Count:", await users.countDocuments());
        const sample = await users.find({}).toArray();
        console.log(sample);

    }
    catch (e) {
        console.log(`Error while running script: ${e}`);
    }
    finally {
        await client.close();
    }
}

async function updateUser(name) {
    try
    {
        await client.connect();
        const users = client.db("db4548").collection("users");

        if(users.findOne({name: name}))
        {
            console.log(`User ${name} has been updated`);
        }
        else
        {
            console.log(`User ${name} does not exist`);
        }
    }
    catch(e)
    {
        console.log(`Error while running script: ${e}`);
    }
    finally
    {
        await client.close();
    }
}

updateUser("John");

//await run();