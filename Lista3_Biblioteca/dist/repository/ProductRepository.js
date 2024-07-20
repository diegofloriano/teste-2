"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor() {
        this.productList = [];
    }
    inserePao(product) {
        this.productList.push(product);
    }
    filtraPaoPorId(id) {
        return this.productList.find(product => product.id === id);
    }
    filtraTodosPaes() {
        return this.productList;
    }
    deletaPao(pao) {
        const index = this.productList.indexOf(pao);
        if (index !== -1) {
            this.productList.splice(index, 1);
        }
    }
    atualizaPao(pao) {
        const index = this.productList.indexOf(pao);
        if (index !== -1) {
            this.productList[index] = pao;
        }
        return index;
    }
}
exports.ProductRepository = ProductRepository;
