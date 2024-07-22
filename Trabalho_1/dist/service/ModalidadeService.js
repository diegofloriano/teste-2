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
        const { nome, vegano } = produtoData;
        if (!nome || !vegano === undefined) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarProduto(undefined, nome);
        if (idExiste) {
            throw new Error("Produto já Existente!");
        }
        const novoProduto = new Modalidade_1.Modalidade(nome, vegano);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }
    consultarProduto(id, nome) {
        if (id && nome) {
            console.log("Com ID e Nome");
            const idNumber = parseInt(id, 10);
            return this.productRepository.filtraProdutoPorNomeId(idNumber, nome);
        }
        else if (id) {
            console.log("Com ID");
            const idNumber = parseInt(id, 10);
            return this.productRepository.filtraProdutoPorId(idNumber);
        }
        else if (nome) {
            console.log("Nome");
            return this.productRepository.filtraProdutoPorNome(nome);
        }
        console.log(id);
        return undefined;
    }
    getProducts() {
        return this.productRepository.filtraTodosProdutos().sort((a, b) => a.id - b.id);
        ;
    }
    deletarProduto(id) {
        const product = this.consultarProduto(id, undefined);
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
        let produtoEncontrado = this.consultarProduto(id, undefined);
        if (!produtoEncontrado) {
            throw new Error("Produto nao cadastrado !!!");
        }
        produtoEncontrado.nome = nome;
        produtoEncontrado.vegano = vegano;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
    }
    consultarNome(id) {
        const estoque = this.consultarProduto(id, undefined);
        if (estoque) {
            return estoque.nome;
        }
        throw new Error("Estoque não encontrado! m");
    }
}
exports.ProductService = ProductService;
