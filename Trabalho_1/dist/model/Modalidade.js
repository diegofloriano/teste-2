"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modalidade = void 0;
class Modalidade {
    constructor(nome, vegano) {
        this.id = this.geraId();
        this.nome = nome;
        this.vegano = vegano;
    }
    geraId() {
        return Date.now();
    }
}
exports.Modalidade = Modalidade;
