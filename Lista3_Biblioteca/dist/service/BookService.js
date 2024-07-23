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
            // let livroExiste = await this.consultarLivro(undefined, isbn);
            // if (livroExiste) {
            //     throw new Error("Livro com ISBN já existente!");
            // }
            const novoLivro = yield this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Insert", novoLivro);
            return novoLivro;
        });
    }
    consultarLivro(id, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id !== undefined) {
                console.log("Com ID");
                return yield this.bookRepository.filterBookId(id);
            }
            else if (isbn) {
                console.log("ISBN");
                return yield this.bookRepository.filterBookIsbn(isbn);
            }
            console.log("ID ou ISBN não fornecidos");
            return undefined;
        });
    }
    atualizarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
            if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
                throw new Error("Informações incompletas");
            }
            let livroExiste = yield this.consultarLivro(parseInt(id, 10), undefined);
            if (!livroExiste) {
                throw new Error("Livro não existente!");
            }
            const livroAtualizado = yield this.bookRepository.updateBook(parseInt(id, 10), title, author, publishedDate, isbn, pages, language, publisher);
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
            let livroExiste = yield this.consultarLivro(livroId, undefined);
            if (!livroExiste) {
                throw new Error("Livro não existente!");
            }
            yield this.bookRepository.deleteBook(livroId);
            console.log("Service - Delete", livroId);
        });
    }
    filtrarLivro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID não fornecido");
            }
            const livroId = parseInt(id, 10);
            let livro = yield this.consultarLivro(livroId, undefined);
            if (!livro) {
                throw new Error("Livro não existente!");
            }
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
