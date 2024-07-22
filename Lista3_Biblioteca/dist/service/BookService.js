"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Books_1 = require("../model/Books");
const BookRepository_1 = require("../repository/BookRepository");
class BookService {
    constructor() {
        this.productRepository = new BookRepository_1.BookRepository();
    }
    cadastrarLivro(produtoData) {
        const { nome, vegano, id } = produtoData;
        if (!nome || !vegano === undefined || !id) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarLivro(id);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        const novoLivro = new Books_1.Livro(nome, vegano, id);
        this.bookRepository.insereLivro(novoLivro);
        return novoLivro;
    }
    consultarLivro(id) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.bookRepository.filtraLivroPorId(idNumber);
    }
    getProducts() {
        return this.bookRepository.filtraTodosLivros();
    }
    deletarLivro(id) {
        const product = this.consultarLivro(id);
        if (!product) {
            throw new Error("Produto nao encontrado");
        }
        this.productRepository.deletaLivro(product);
    }
    atualizarLivro(produtoData) {
        const { id, nome, vegano } = produtoData;
        if (!nome || !vegano === undefined || !id) {
            throw new Error("Informacoes incompletas");
        }
        let produtoEncontrado = this.consultarLivro(id);
        if (!produtoEncontrado) {
            throw new Error("Produto nao cadastrado !!!");
        }
        produtoEncontrado.nome = nome;
        produtoEncontrado.vegano = vegano;
        this.productRepository.atualizaLivro(produtoEncontrado);
        return produtoEncontrado;
    }
    consultarNome(EstoqueId) {
        const estoque = this.consultarLivro(EstoqueId);
        if (estoque) {
            return estoque.nome;
        }
        throw new Error("Estoque não encontrado!");
    }
}
exports.BookService = BookService;
