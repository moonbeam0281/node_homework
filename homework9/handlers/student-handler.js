import { read, write } from './read-write.js'

const FILE = './handlers/students.json';

const getAllStudent = async () => {
    try {
        let stu = await read(FILE);
        return stu;
    }
    catch (e) {
        console.log(`Error while getting students:\n${e}`);
    }
};

const addStudent = async (newStudent) => {
    try {
        let stu = await read(FILE);
        stu.push(newStudent);
        await write(FILE, stu);
    }
    catch (e) {
        console.log(`Error while addding students:\n${e}`);
    }
};

const removeStudent = async (i) => {
    try {
        let stu = await read(FILE);
        stu.splice(i, 1);
        await write(FILE, stu);
    }
    catch (e) {
        console.log(`Error while deleting students:\n${e}`);
    }
};

export default {
    getAllStudent,
    addStudent,
    removeStudent
}