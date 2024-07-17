"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaService = void 0;
const Venda_1 = require("../model/Venda");
const VendaRepository_1 = require("../repository/VendaRepository");
const Venda_2 = require("../model/Venda");
const EstoqueService_1 = require("./EstoqueService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
class VendaService {
    constructor() {
        this.vendaRepository = new VendaRepository_1.VendaRepository();
        this.estoqueService = new EstoqueService_1.EstoqueService();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
    }
    cadastrarVenda(vendaData) {
        const { id, cpf, itens } = vendaData;
        if (!id || !cpf || !itens) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(id);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        const itemVendaList = [];
        let total = 0;
        for (const item of itens) {
            const { quantidade, EstoqueId } = item;
            if (!quantidade || !EstoqueId) {
                throw new Error("Informações incompletas");
            }
            let idEncontrado = this.consultarId(EstoqueId);
            if (!idEncontrado) {
                throw new Error("Id nao encontrado !!!");
            }
            this.estoqueService.deletarEstoque(EstoqueId);
            const itemVenda = new Venda_2.ItemVenda(EstoqueId, quantidade);
            itemVendaList.push(itemVenda);
        }
        const novaVenda = new Venda_1.Venda(id, total, cpf, itemVendaList);
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
    consultarPreco(EstoqueId) {
        return this.estoqueRepository.filtraPrecoPorId(EstoqueId);
    }
    getProducts() {
        return this.vendaRepository.filtraTodasVendas();
    }
}
exports.VendaService = VendaService;
