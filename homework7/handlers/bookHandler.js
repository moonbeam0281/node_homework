import path from "path";
import { read, write } from "./read-write.js";

const booksFile = path.resolve("./handlers/book.json");

export async function getBooks(req, res) {
    try {
        const books = await read(booksFile);
        res.json(books);
    }
    catch (e) {
        res.status(500).json({ error: "Error while reading book file" });
    }
}

export async function addBook(req, res) {
    try {
        const books = await read(booksFile);
        const newBook = req.body;

        books.push(newBook);
        await write(booksFile, books);

        res.status(201).json({
            message: "Book added!",
            book: newBook
        });
    }
    catch (e) {
        res.status(500).json({
            error: "Failed to add book!"
        });
    }
}