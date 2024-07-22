"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendaService = void 0;
const Venda_1 = require("../model/Venda");
const VendaRepository_1 = require("../repository/VendaRepository");
const Venda_2 = require("../model/Venda");
const EstoqueService_1 = require("./EstoqueService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const ModalidadeService_1 = require("./ModalidadeService");
class VendaService {
    constructor() {
        this.vendaRepository = new VendaRepository_1.VendaRepository();
        this.estoqueService = new EstoqueService_1.EstoqueService();
        this.estoqueRepository = new EstoqueRepository_1.EstoqueRepository();
        this.productService = new ModalidadeService_1.ProductService();
    }
    cadastrarVenda(vendaData) {
        const { cpf, itens } = vendaData;
        if (!cpf || !itens) {
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(undefined);
        if (idExiste) {
            throw new Error("ID já Existente!");
        }
        const itemVendaList = [];
        let total = 0;
        for (const item of itens) {
            const { quantidade, EstoqueId } = item;
            if (!quantidade || !EstoqueId) {
                throw new Error("Informacoes incompletas");
            }
            let idEncontrado = this.consultarId(EstoqueId);
            if (!idEncontrado) {
                throw new Error("Id nao encontrado !!!");
            }
            this.estoqueService.deletarQuantidade(EstoqueId, quantidade);
            const nome = this.estoqueService.consultarNome(EstoqueId);
            const itemVenda = new Venda_2.ItemVenda(EstoqueId, quantidade, nome);
            itemVendaList.push(itemVenda);
            const preco = this.estoqueService.consultarPreco(EstoqueId);
            total += quantidade * preco;
        }
        const novaVenda = new Venda_1.Venda(cpf, total, itemVendaList);
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }
    consultarVenda(id) {
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
    getVendas() {
        return this.vendaRepository.filtraTodasVendas().sort((a, b) => a.id - b.id);
    }
}
exports.VendaService = VendaService;
