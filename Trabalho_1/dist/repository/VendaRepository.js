"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor() {
        this.productList = [];
    }
    insereVenda(product) {
        this.productList.push(product);
    }
    filtraVendaPorId(id) {
        return this.productList.find(product => product.id === id);
    }
    filtraTodasVendas() {
        return this.productList;
    }
}
exports.ProductRepository = ProductRepository;
