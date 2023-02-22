import { default as db } from "./books.json";

// console.log(typeof db.books);
// console.log(`${db.books[0].image}`);
const dataBooks = db.books;
console.log(dataBooks[3]);
let a = dataBooks.setItem(key, value);
