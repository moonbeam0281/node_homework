export function checkBook(req, res, next) {
    const book = req.body;
    console.log('Checking book...');
    /*
    Направете еден middleware каде ќе се појавува некоја порака 
    доколку книгата е постара од 2000 година
    и има повеќе од 300 страници.
    */
    if (book.relDate < 2000 && book.pageCount > 300)
        console.log(`Book: ${book.title} is older than 2000 and has more than 300 pages`);

    next();
}

/* TEST POST WITH THIS BOOK:

{
    "title": "Magic book test",
    "description": "Forbidden magic",
    "genre": "Fantasy",
    "author": "Me",
    "relDate": 1995,
    "pageCount": 400,
    "rating": 4.8
}

*/