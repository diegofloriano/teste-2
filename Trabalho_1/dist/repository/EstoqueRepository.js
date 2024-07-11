"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    constructor() {
        this.estoqueList = [];
    }
    insereEstoque(product) {
        this.estoqueList.push(product);
    }
    filtraEstoquePorId(id) {
        return this.estoqueList.find(product => product.id === id);
    }
    filtraTodosEstoques() {
        return this.estoqueList;
    }
    deletaEstoque(produto) {
        const index = this.estoqueList.indexOf(produto);
        if (index !== -1) {
            this.estoqueList.splice(index, 1);
        }
    }
    atualizaEstoque(produto) {
        const index = this.estoqueList.indexOf(produto);
        if (index !== -1) {
            this.estoqueList[index] = produto;
        }
        return index;
    }
}
exports.EstoqueRepository = EstoqueRepository;
