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
exports.BookService = void 0;
const BookRepository_1 = require("../repository/BookRepository");
class BookService {
    constructor() {
        this.bookRepository = new BookRepository_1.BookRepository();
    }
    cadastrarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            const novoLivro = yield this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Insert ", novoLivro);
            return novoLivro;
        });
    }
    atualizarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            const livro = yield this.bookRepository.updateBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Update ", livro);
            return livro;
        });
    }
    deletarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            const livro = yield this.bookRepository.deleteBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Delete ", livro);
            return livro;
        });
    }
    filtrarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livroData) {
                throw new Error("Informações incompletas");
            }
            const id = parseInt(livroData, 10);
            const livro = yield this.bookRepository.filterBook(id);
            console.log("Service - Filtrar", livro);
            return livro;
        });
    }
    listarTodosLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield this.bookRepository.filterAllBooks();
            console.log("Service - Filtrar Todos", livro);
            return livro;
        });
    }
}
exports.BookService = BookService;
