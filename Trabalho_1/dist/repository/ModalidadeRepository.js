"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const database_1 = require("../global/database");
class ProductRepository {
    constructor() {
        this.productList = (0, database_1.getModalidadeList)();
        this.estoqueList = (0, database_1.getEstoqueList)();
        this.vendaList = (0, database_1.getVendaList)();
    }
    insereProduto(product) {
        this.productList.push(product);
    }
    filtraProdutoPorId(id) {
        return this.productList.find(product => product.id === id);
    }
    filtraModalidadePorId(ModalidadeId) {
        return this.estoqueList.find(product => product.id === ModalidadeId);
    }
    filtraTodosProdutos() {
        return this.productList;
    }
    deletaProduto(produto) {
        const index = this.productList.indexOf(produto);
        if (index !== -1) {
            this.productList.splice(index, 1);
        }
    }
    atualizaProduto(produto) {
        const index = this.productList.indexOf(produto);
        if (index !== -1) {
            this.productList[index] = produto;
        }
        return index;
    }
}
exports.ProductRepository = ProductRepository;
