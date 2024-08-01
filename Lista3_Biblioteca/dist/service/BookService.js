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
            const existe = yield this.filtrarLivro(undefined, isbn);
            console.log(existe === null || existe === void 0 ? void 0 : existe.length); //retorna o tamanho da lista
            const quantidadeCadastrada = (existe === null || existe === void 0 ? void 0 : existe.length) || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
            if (quantidadeCadastrada > 0) { //se tiver alguem na lista, ou seja, maior que 0
                throw new Error("ISBN já existe!"); //erro
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
            yield this.filtrarLivro(id, undefined);
            const livroAtualizado = yield this.bookRepository.updateBook(id, title, author, publishedDate, isbn, pages, language, publisher);
            console.log("Service - Update", livroAtualizado);
            return livroAtualizado;
        });
    }
    deletarLivro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Informações incompletas");
            }
            yield this.filtrarLivro(id, undefined);
            const livroDeletado = yield this.bookRepository.deleteBook(id);
            console.log("Service - Delete", livroDeletado);
            return livroDeletado;
        });
    }
    filtrarLivro(id, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const idNumber = parseInt(id);
                const livros = yield this.bookRepository.filterBookId(idNumber); //você sempre recebe uma lista do mysql2 (Book[])
                if ((livros === null || livros === void 0 ? void 0 : livros.length) === 0) {
                    throw new Error("Id não encontrado");
                }
                console.log("Service - Filtrar", livros);
                return livros;
            }
            else if (isbn) {
                const livros = yield this.bookRepository.filterBookIsbn(isbn);
                console.log("Service - Filtrar", livros);
                return livros;
            }
            return undefined;
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
