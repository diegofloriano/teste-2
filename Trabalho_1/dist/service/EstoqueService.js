"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const ModalidadeRepository_1 = require("../repository/ModalidadeRepository");
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class EstoqueService {
    constructor() {
        this.productRepository = new ModalidadeRepository_1.ProductRepository();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
    }
    cadastrarEstoque(estoqueData) {
        const { id, ModalidadeId, quantidade, precoVenda } = estoqueData;
        if (!id || !ModalidadeId || !quantidade || !precoVenda) {
            throw new Error("Informações incompletas");
        }
        if (quantidade < 0) {
            throw new Error("Quantidade não pode ser negativa");
        }
        let modalidadeEncontrada = this.productRepository.filtraProdutoPorId(ModalidadeId);
        if (!modalidadeEncontrada) {
            throw new Error("Modalidade Invalida !");
        }
        const novoEstoque = new Estoque_1.Estoque(id, ModalidadeId, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id, undefined) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.estoqueRepository.filtraEstoquePorId(idNumber);
    }
    getProducts() {
        return this.estoqueRepository.filtraTodosEstoques();
    }
    deletarEstoque(id) {
        const product = this.consultarEstoque(id, undefined);
        if (!product) {
            throw new Error("Produto nao encontrado");
        }
        this.estoqueRepository.deletaEstoque(product);
    }
    atualizarEstoque(estoqueData) {
        const { id, quantidade, ModalidadeId, precoVenda } = estoqueData;
        if (!id || !quantidade || !ModalidadeId || !precoVenda) {
            if (quantidade < 0) {
                throw new Error("Informacoes incompletas");
            }
        }
        let estoqueEncontrado = this.consultarEstoque(id, undefined);
        if (!estoqueEncontrado) {
            throw new Error("Estoque nao cadastrado !!!");
        }
        estoqueEncontrado.ModalidadeId = ModalidadeId;
        estoqueEncontrado.quantidade = quantidade;
        estoqueEncontrado.precoVenda = precoVenda;
        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
    }
}
exports.EstoqueService = EstoqueService;
