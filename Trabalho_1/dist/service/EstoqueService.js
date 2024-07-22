"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const ModalidadeRepository_1 = require("../repository/ModalidadeRepository");
const ModalidadeService_1 = require("./ModalidadeService");
class EstoqueService {
    constructor() {
        this.productRepository = new ModalidadeRepository_1.ProductRepository();
        this.productService = new ModalidadeService_1.ProductService();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
    }
    cadastrarEstoque(estoqueData) {
        const { ModalidadeId, quantidade, precoVenda } = estoqueData;
        if (!ModalidadeId || !quantidade || !precoVenda) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarEstoque(undefined);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        if (quantidade < 0) {
            throw new Error("Quantidade não pode ser negativa");
        }
        let idEncontrado = this.consultarId(ModalidadeId);
        if (!idEncontrado) {
            throw new Error("Id nao encontrado !!!");
        }
        const novoEstoque = new Estoque_1.Estoque(ModalidadeId, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
    }
    consultarEstoque(id) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.estoqueRepository.filtraEstoquePorId(idNumber);
    }
    consultarId(ModalidadeId) {
        return this.productRepository.filtraProdutoPorId(ModalidadeId);
    }
    getEstoque() {
        return this.estoqueRepository.filtraTodosEstoques().sort((a, b) => a.id - b.id);
        ;
    }
    deletarEstoque(estoqueData) {
        const { id, quantidade } = estoqueData;
        if (!id || !quantidade) {
            if (quantidade <= 0) {
                throw new Error("Informacoes incompletas");
            }
        }
        let estoqueEncontrado = this.consultarEstoque(id);
        if (!estoqueEncontrado) {
            throw new Error("Estoque nao cadastrado !!!");
        }
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para exclusão");
        }
        estoqueEncontrado.ModalidadeId;
        estoqueEncontrado.quantidade -= quantidade;
        estoqueEncontrado.precoVenda;
        this.estoqueRepository.deletaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
    }
    atualizarEstoque(estoqueData) {
        const { id, quantidade } = estoqueData;
        if (!id || !quantidade) {
            if (quantidade <= 0) {
                throw new Error("Informacoes incompletas");
            }
        }
        let estoqueEncontrado = this.consultarEstoque(id);
        if (!estoqueEncontrado) {
            throw new Error("Estoque nao cadastrado !!!");
        }
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para soma");
        }
        estoqueEncontrado.ModalidadeId;
        estoqueEncontrado.quantidade += quantidade;
        estoqueEncontrado.precoVenda;
        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
    }
    deletarQuantidade(id, quantidade) {
        let estoqueEncontrado = this.consultarEstoque(id);
        if (!estoqueEncontrado) {
            throw new Error("Estoque nao cadastrado !!!");
        }
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para Venda");
        }
        estoqueEncontrado.quantidade -= quantidade;
        this.estoqueRepository.deletaEstoque(estoqueEncontrado);
    }
    consultarPreco(id) {
        const estoque = this.consultarEstoque(id);
        if (estoque) {
            return estoque.precoVenda;
        }
        throw new Error("Estoque não encontrado! e");
    }
    consultarNome(id) {
        const estoque = this.consultarEstoque(id);
        if (estoque) {
            const busca = estoque.ModalidadeId;
            const nome = this.productService.consultarNome(busca);
            return nome;
        }
        throw new Error("Estoque não encontrado! e n");
    }
}
exports.EstoqueService = EstoqueService;
