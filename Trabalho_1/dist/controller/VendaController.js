"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarVenda = cadastrarVenda;
exports.pesquisarVendaPorID = pesquisarVendaPorID;
exports.listaVendas = listaVendas;
const VendaService_1 = require("../service/VendaService");
const vendaService = new VendaService_1.VendaService();
function cadastrarVenda(req, res) {
    try {
        const novaVenda = vendaService.cadastrarVenda(req.body);
        res.status(201).json({
            mensagem: "Venda adicionada com sucesso!",
            produto: novaVenda
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function pesquisarVendaPorID(req, res) {
    try {
        const Venda = vendaService.consultarVenda(req.query.id);
        if (Venda) {
            res.status(200).json({
                mensagem: "Venda encontrada com sucesso!",
                Venda: Venda
            });
        }
        else {
            res.status(404).json({ mensagem: "Venda não encontrada." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function listaVendas(req, res) {
    try {
        res.status(200).json(vendaService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
