import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'textfile.txt');

// write (overwrite file)
async function writeStudent(data) {
    try {
        await fs.writeFile(filePath, data, 'utf8');
    } catch (err) {
        console.error("Write failed:", err);
    }
}

// add
async function appendStudent(data) {
    try {
        await fs.appendFile(filePath, data, 'utf8');
    } catch (err) {
        console.error("Append failed:", err);
    }
}

// read
async function readStudent() {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log("textfile.txt content:\n" + content);
    } catch (err) {
        console.error("Read failed:", err);
    }
}

// reset (empty the file)
async function resetStudents() {
    try {
        await fs.writeFile(filePath, '', 'utf8');
    } catch (err) {
        console.error("Reset failed:", err);
    }
}

// export
export {
    writeStudent,
    appendStudent,
    readStudent,
    resetStudents
};
