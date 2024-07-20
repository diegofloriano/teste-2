"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Modalidade_1 = require("../model/Modalidade");
const ModalidadeRepository_1 = require("../repository/ModalidadeRepository");
class ProductService {
    constructor() {
        this.productRepository = new ModalidadeRepository_1.ProductRepository();
    }
    cadastrarProduto(produtoData) {
        const { nome, vegano, id } = produtoData;
        if (!nome || !vegano === undefined || !id) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarProduto(id);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        const novoProduto = new Modalidade_1.Modalidade(nome, vegano, id);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }
    consultarProduto(id) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.productRepository.filtraProdutoPorId(idNumber);
    }
    getProducts() {
        return this.productRepository.filtraTodosProdutos();
    }
    deletarProduto(id) {
        const product = this.consultarProduto(id);
        if (!product) {
            throw new Error("Produto nao encontrado");
        }
        this.productRepository.deletaProduto(product);
    }
    atualizarProduto(produtoData) {
        const { id, nome, vegano } = produtoData;
        if (!nome || !vegano === undefined || !id) {
            throw new Error("Informacoes incompletas");
        }
        let produtoEncontrado = this.consultarProduto(id);
        if (!produtoEncontrado) {
            throw new Error("Produto nao cadastrado !!!");
        }
        produtoEncontrado.nome = nome;
        produtoEncontrado.vegano = vegano;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
    }
    consultarNome(EstoqueId) {
        const estoque = this.consultarProduto(EstoqueId);
        if (estoque) {
            return estoque.nome;
        }
        throw new Error("Estoque não encontrado!");
    }
}
exports.ProductService = ProductService;
