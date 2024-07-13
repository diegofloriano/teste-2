"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const ModalidadeService_1 = require("../service/ModalidadeService");
const ModalidadeRepository_1 = require("../repository/ModalidadeRepository");
class EstoqueService {
    constructor() {
        this.productService = new ModalidadeService_1.ProductService();
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
        let idEncontrado = this.consultarId(ModalidadeId);
        if (!idEncontrado) {
            throw new Error("Id nao encontrado !!!");
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
    consultarId(ModalidadeId) {
        return this.productRepository.filtraProdutoPorId(ModalidadeId);
    }
    getProducts() {
        return this.estoqueRepository.filtraTodosEstoques();
    }
    deletarEstoque(estoqueData) {
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
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para exclusão");
        }
        estoqueEncontrado.ModalidadeId = ModalidadeId;
        estoqueEncontrado.quantidade -= quantidade;
        estoqueEncontrado.precoVenda = precoVenda;
        this.estoqueRepository.deletaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
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
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para soma");
        }
        estoqueEncontrado.ModalidadeId = ModalidadeId;
        estoqueEncontrado.quantidade += quantidade;
        estoqueEncontrado.precoVenda = precoVenda;
        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
    }
}
exports.EstoqueService = EstoqueService;
