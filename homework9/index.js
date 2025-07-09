import express from 'express';
import studentManager from './handlers/student-handler.js';

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"\n`);
    next();
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.post("/form", async (req,res) => {
    let bData = req.body;
    let stuData = {
        stuName: bData.stuName,
        stuLName: bData.stuLName,
        stuScore: bData.stuScore
    };
    await studentManager.addStudent(stuData);
    res.redirect("/students");
});

app.get("/students", async (req, res) => {
    let students = await studentManager.getAllStudent();
    res.render("students", {students});
});

app.get('/delete', async (req, res) => {
    let i = Number(req.query.i);
    await studentManager.removeStudent(i);
    res.redirect('/students');
});

app.get("/", (req, res) => {
    res.render("index");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
