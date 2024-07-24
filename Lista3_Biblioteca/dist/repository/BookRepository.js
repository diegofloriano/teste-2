"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const mysql_1 = require("../database/mysql");
const Books_1 = require("../model/Books");
class BookRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        CREATE TABLE IF NOT EXISTS library.Book (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages DECIMAL(10,2) NOT NULL,
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Query executada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertBook(title, author, publishedDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO library.Book (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [title, author, publishedDate, isbn, pages, language, publisher]);
                console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
                const book = new Books_1.Book(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error('Erro ao inserir o livro:', err);
                throw err;
            }
        });
    }
    updateBook(id, title, author, publishedDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE library.book set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
                console.log('Livro atualizado com sucesso, ID: ', resultado);
                const book = new Books_1.Book(id, title, author, publishedDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM library.book where id = ?;";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Produto deletado com sucesso, ID: ', resultado);
                const book = new Books_1.Book(id);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterBookId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM library.book where id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Livro localizado com sucesso, ID: ', resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterBookIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM library.book where isbn = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [isbn]);
                console.log('Livro localizado com sucesso, ISBN: ', resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM library.book";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao listar os livros gerando o erro: ${err}`);
                throw err;
            }
        });
    }
}
exports.BookRepository = BookRepository;
