"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venda = exports.ItemVenda = void 0;
class ItemVenda {
    constructor(EstoqueId, quantidade, nome) {
        this.EstoqueId = EstoqueId;
        this.quantidade = quantidade;
        this.nome = nome;
    }
}
exports.ItemVenda = ItemVenda;
class Venda {
    constructor(cpf, total, itens) {
        this.id = this.geraId();
        this.cpf = cpf;
        this.total = total;
        this.itens = itens;
    }
    geraId() {
        return Date.now();
    }
}
exports.Venda = Venda;
