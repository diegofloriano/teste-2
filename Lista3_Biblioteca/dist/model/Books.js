"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    constructor(title, author, publishedDate, isbn, pages, language, publisher) {
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.pages = pages;
        this.language = language;
        this.publisher = publisher;
    }
}
exports.Livro = Livro;
