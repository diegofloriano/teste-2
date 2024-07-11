"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ModalidadePaes_1 = require("../model/ModalidadePaes");
const ProductRepository_1 = require("../repository/ProductRepository");
class ProductService {
    constructor() {
        this.productRepository = new ProductRepository_1.ProductRepository();
    }
    cadastrarPao(paoData) {
        const { nome, vegano, id } = paoData;
        if (!nome || !vegano || !id) {
            throw new Error("Informações incompletas");
        }
        const novoPao = new ModalidadePaes_1.ModalidadePaes(nome, vegano, id);
        this.productRepository.inserePao(novoPao);
        return novoPao;
    }
    consultarPao(id, undefined) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.productRepository.filtraPaoPorId(idNumber);
    }
    getProducts() {
        return this.productRepository.filtraTodosPaes();
    }
    deletarPao(id) {
        const ModalidadePaes = this.consultarPao(id, undefined);
        if (!ModalidadePaes) {
            throw new Error(" Pao nao encontrado ");
        }
        this.productRepository.deletaPao(ModalidadePaes);
    }
    atualizarProduto(paoData) {
        const { id, nome, vegano } = paoData;
        if (!nome || !vegano || !id) {
            throw new Error(" Informacoes incompletas ");
        }
        let paoEncontrado = this.consultarPao(id, undefined);
        if (!paoEncontrado) {
            throw new Error(" Pao nao cadastrado !!!");
        }
        paoEncontrado.id = id;
        paoEncontrado.nome = nome;
        paoEncontrado.vegano = vegano;
        this.productRepository.atualizaPao(paoEncontrado);
        return paoEncontrado;
    }
}
exports.ProductService = ProductService;
