"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaPaes = exports.ItemVenda = void 0;
class ItemVenda {
    constructor(id, quantidade, preco) {
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }
}
exports.ItemVenda = ItemVenda;
class VendaPaes {
    constructor(id, cpf, total, itens) {
        this.id = id;
        this.cpf = cpf;
        this.total = total;
        this.itens = itens;
    }
}
exports.VendaPaes = VendaPaes;
