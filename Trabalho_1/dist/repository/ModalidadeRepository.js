"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor() {
        this.productList = [];
    }
    insereProduto(product) {
        this.productList.push(product);
    }
    filtraProdutoPorId(id) {
        return this.productList.find(product => product.id === id);
    }
    filtraTodosProdutos() {
        return this.productList;
    }
    deletaProduto(produto) {
        const index = this.productList.indexOf(produto);
        if (index !== -1) {
            this.productList.splice(index, 1);
        }
    }
    atualizaProduto(produto) {
        const index = this.productList.indexOf(produto);
        if (index !== -1) {
            this.productList[index] = produto;
        }
        return index;
    }
}
exports.ProductRepository = ProductRepository;
