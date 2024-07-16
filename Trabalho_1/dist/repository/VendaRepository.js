"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaRepository = void 0;
const database_1 = require("../global/database");
class VendaRepository {
    constructor() {
        this.productList = (0, database_1.getModalidadeList)();
        this.estoqueList = (0, database_1.getEstoqueList)();
        this.vendaList = (0, database_1.getVendaList)();
        this.itemVendaList = (0, database_1.getItemVendaList)();
    }
    insereVenda(venda) {
        this.vendaList.push(venda);
        this.productList.sort((a, b) => a.id - b.id);
    }
    filtraVendaPorId(id) {
        return this.vendaList.find(venda => venda.id === id);
    }
    filtraTodasVendas() {
        return this.vendaList;
    }
}
exports.VendaRepository = VendaRepository;
