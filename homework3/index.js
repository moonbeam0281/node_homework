import { writeStudent, readStudent, appendStudent, resetStudents } from './filewriter.js';
import { task1, task2, task3, task4, task5 } from './tasks.js';

async function main() {
    console.log("Writing John Doe on file...\n");
    await writeStudent("John Doe");
    await readStudent();

    console.log("\nAdding ', 25 years' on the file...\n");
    await appendStudent(", 25 years");
    await readStudent();

    console.log("\nResetting textfile.txt...\n");
    await resetStudents();
    await readStudent();

    console.log("----Starting students filter promises----");

    console.log("Task 1:");
    console.log(await task1());

    console.log("\nTask 2:");
    console.log(await task2());

    console.log("\nTask 3:");
    console.log(await task3());

    console.log("\nTask 4:");
    console.log(await task4());

    console.log("\nTask 5:");
    console.log(await task5());
}

main();
