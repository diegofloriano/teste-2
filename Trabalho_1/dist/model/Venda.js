"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venda = exports.ItemVenda = void 0;
class ItemVenda {
    constructor(EstoqueId, quantidade) {
        this.EstoqueId = EstoqueId;
        this.quantidade = quantidade;
    }
}
exports.ItemVenda = ItemVenda;
class Venda {
    constructor(id, cpf, total, itens) {
        this.id = id;
        this.cpf = cpf;
        this.total = total;
        this.itens = itens;
    }
}
exports.Venda = Venda;
