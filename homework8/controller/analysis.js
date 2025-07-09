import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getTextField(req, res){
    try
    {
        const temp = await parseTemplate("text");
        res.status(200).send(temp);
    }
    catch(err)
    {
        console.log(err);
        res.stats(500).send("Template Error");
    }
};

export async function getTextAnalisis(req, res){
    try
    {
        const text = req.body.text;
        console.log(text);
        const words = text.trim().split(/\s+/);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const vowels = ['a', 'o', 'y', 'i', 'e'];

        const stats = {
            totalChar: text.length,
            totalWords: words.length,
            shortWrd: words.filter(w => w.length < 5).length,
            exact5: words.filter(w => w.length === 5).length,
            longWrd: words.filter(w => w.length > 5).length,
            sentCount: sentences.length,
            vowlCount: words.filter(w => vowels.includes(w[0]?.toLowerCase())).length
        }

        const temp = await parseTemplate("result", stats)

        res.status(200).send(temp);

    }
    catch(err)
    {
        console.log(err);
        res.stats(500).send("Template Error");
    }
}

const parseTemplate = async (template, data = null) => {
    try
    {
        let content = await readFile(`${__dirname}/../views/${template}.html`, "utf-8");

        if(data)
            for(const x in data)
                content = content.replace(`{{${x}}}`, data[x]);
        return content;
    }
    catch(err)
    {
        console.log(err);
    }
};