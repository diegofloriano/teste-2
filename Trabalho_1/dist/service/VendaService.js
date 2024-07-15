"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaService = void 0;
const VendaRepository_1 = require("../repository/VendaRepository");
const Venda_1 = require("../model/Venda");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class VendaService {
    constructor() {
        this.vendaRepository = new VendaRepository_1.VendaRepository();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
    }
    cadastrarVenda(vendaData) {
        const { quantidade, EstoqueId } = vendaData;
        if (!quantidade || !EstoqueId) {
            throw new Error("Informações incompletas");
        }
        let idEncontrado = this.consultarId(EstoqueId);
        if (!idEncontrado) {
            throw new Error("Id nao encontrado !!!");
        }
        const novoItem = new Venda_1.ItemVenda(EstoqueId, quantidade);
        this.vendaRepository.insereVenda(novoItem);
        return novoItem;
    }
    consultarVenda(id, undefined) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.vendaRepository.filtraVendaPorId(idNumber);
    }
    consultarId(EstoqueId) {
        return this.estoqueRepository.filtraEstoquePorVenda(EstoqueId);
    }
    getProducts() {
        return this.vendaRepository.filtraTodasVendas();
    }
}
exports.VendaService = VendaService;
