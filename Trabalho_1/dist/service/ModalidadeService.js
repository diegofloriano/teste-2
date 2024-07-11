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
        const { nome, vegano, id, preco } = produtoData;
        if (!nome || !vegano === undefined || !id || !preco) {
            throw new Error("Informações incompletas");
        }
        const novoProduto = new Modalidade_1.Modalidade(nome, vegano, id, preco);
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
        const { id, nome, vegano, preco } = produtoData;
        if (!nome || !vegano === undefined || !id || !preco) {
            throw new Error("Informacoes incompletas");
        }
        let produtoEncontrado = this.consultarProduto(id);
        if (!produtoEncontrado) {
            throw new Error("Produto nao cadastrado !!!");
        }
        produtoEncontrado.nome = nome;
        produtoEncontrado.vegano = vegano;
        produtoEncontrado.preco = preco;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
    }
}
exports.ProductService = ProductService;
