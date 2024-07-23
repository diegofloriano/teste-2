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
            let livroExiste = yield this.consultarLivro(undefined, isbn);
            if (livroExiste) {
                throw new Error("Livro com ISBN já Existente!");
            }
            const novoLivro = yield this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Insert ", novoLivro);
            return novoLivro;
        });
    }
    consultarLivro(id, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                console.log("Com ID");
                const idNumber = parseInt(id, 10);
                return this.bookRepository.filterBookId(idNumber);
            }
            else if (isbn) {
                console.log("ISBN");
                return this.bookRepository.filterBookIsbn(isbn);
            }
            console.log(id);
            return id || isbn;
        });
    }
    atualizarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            const id = parseInt(livroData, 10);
            let livroExiste = yield this.consultarLivro(id, undefined);
            if (!livroExiste) {
                throw new Error("Livro não Existente!");
            }
            const livro = yield this.bookRepository.updateBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Update ", livro);
            return livro;
        });
    }
    deletarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livroData) {
                throw new Error("Informações incompletas");
            }
            const id = parseInt(livroData, 10);
            let livroExiste = yield this.consultarLivro(id, undefined);
            if (!livroExiste) {
                throw new Error("Livro não Existente!");
            }
            const livro = yield this.bookRepository.deleteBook(livroData);
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
            let livroExiste = yield this.consultarLivro(id, undefined);
            if (!livroExiste) {
                throw new Error("Livro não Existente!");
            }
            const livro = yield this.bookRepository.filterBookId(id);
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
