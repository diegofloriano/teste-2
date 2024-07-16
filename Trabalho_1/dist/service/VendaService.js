"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaService = void 0;
const Venda_1 = require("../model/Venda");
const VendaRepository_1 = require("../repository/VendaRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class VendaService {
    constructor() {
        this.vendaRepository = new VendaRepository_1.VendaRepository();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
    }
    cadastrarVenda(vendaData, itemData) {
        const { id, total, cpf, itens } = vendaData;
        if (!id || !total || !cpf || !itens) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(id);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        const { quantidade, EstoqueId } = itemData;
        if (!quantidade || !EstoqueId) {
            throw new Error("Informações incompletas");
        }
        let idEncontrado = this.consultarId(EstoqueId);
        if (!idEncontrado) {
            throw new Error("Id nao encontrado !!!");
        }
        const novaVenda = new Venda_1.Venda(id, total, cpf, itens[itemData]);
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }
    consultarVenda(id, undefined) {
        const idNumber = parseInt(id, 10);
        console.log(id);
        return this.vendaRepository.filtraVendaPorId(idNumber);
    }
    consultarId(EstoqueId) {
        return this.estoqueRepository.filtraEstoquePorId(EstoqueId);
    }
    getProducts() {
        return this.vendaRepository.filtraTodasVendas();
    }
}
exports.VendaService = VendaService;
