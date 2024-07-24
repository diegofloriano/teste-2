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
            console.log("Service - Insert", novoLivro);
            return novoLivro;
        });
    }
    atualizarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            const livroAtualizado = yield this.bookRepository.updateBook(id, title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Update", livroAtualizado);
            return livroAtualizado;
        });
    }
    deletarLivro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID não fornecido");
            }
            const livroId = parseInt(id, 10);
            yield this.bookRepository.deleteBook(livroId);
            console.log("Service - Delete", livroId);
        });
    }
    filtrarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!livroData) {
                throw new Error("ID não fornecido");
            }
            const id = parseInt(livroData, 10);
            const livro = yield this.bookRepository.filterBookId(id);
            console.log("Service - Filtrar", livro);
            return livro;
        });
    }
    listarTodosLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            const livros = yield this.bookRepository.filterAllBooks();
            console.log("Service - Listar Todos", livros);
            return livros;
        });
    }
}
exports.BookService = BookService;
