"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Venda_1 = require("../model/Venda");
const VendaRepository_1 = require("../repository/VendaRepository");
class ProductService {
    constructor() {
        this.productRepository = new VendaRepository_1.ProductRepository();
    }
    cadastrarVenda(vendaData) {
        const { id, cpf, total, itens, quantidade, EstoqueId, preco } = vendaData;
        if (!id || !cpf || !total || !itens || !quantidade || !EstoqueId || !preco) {
            throw new Error("Informações incompletas");
        }
        const novoProduto = new Venda_1.Venda(id, cpf, total, itens);
        this.productRepository.insereVenda(novoProduto);
        return novoProduto;
    }
    consultarVenda(id, undefined) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.productRepository.filtraVendaPorId(idNumber);
    }
    getProducts() {
        return this.productRepository.filtraTodasVendas();
    }
}
exports.ProductService = ProductService;
