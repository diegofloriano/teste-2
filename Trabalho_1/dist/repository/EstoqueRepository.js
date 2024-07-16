"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const database_1 = require("../global/database");
class EstoqueRepository {
    constructor() {
        this.productList = (0, database_1.getModalidadeList)();
        this.estoqueList = (0, database_1.getEstoqueList)();
        this.vendaList = (0, database_1.getVendaList)();
        this.itemVendaList = (0, database_1.getItemVendaList)();
    }
    insereEstoque(estoque) {
        this.estoqueList.push(estoque);
        this.estoqueList.sort((a, b) => a.id - b.id);
    }
    filtraEstoquePorId(id) {
        return this.estoqueList.find(estoque => estoque.id === id);
    }
    filtraTodosEstoques() {
        return this.estoqueList;
    }
    deletaEstoque(estoque) {
        const index = this.estoqueList.indexOf(estoque);
        if (index !== -1) {
            this.estoqueList[index] = estoque;
        }
        return index;
    }
    atualizaEstoque(estoque) {
        const index = this.estoqueList.indexOf(estoque);
        if (index !== -1) {
            this.estoqueList[index] = estoque;
        }
        return index;
    }
}
exports.EstoqueRepository = EstoqueRepository;
