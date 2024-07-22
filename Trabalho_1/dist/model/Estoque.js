"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(ModalidadeId, quantidade, precoVenda) {
        this.id = this.geraId();
        this.ModalidadeId = ModalidadeId;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }
    geraId() {
        return Date.now();
    }
}
exports.Estoque = Estoque;
