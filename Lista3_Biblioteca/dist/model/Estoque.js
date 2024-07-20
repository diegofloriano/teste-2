"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(id, ModalidadeId, quantidade, precoVenda) {
        this.id = id;
        this.ModalidadeId = ModalidadeId;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }
}
exports.Estoque = Estoque;
