"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaVendas = exports.pesquisarVendaPorID = exports.cadastrarVenda = void 0;
const VendaService_1 = require("../service/VendaService");
const productService = new VendaService_1.ProductService();
function cadastrarVenda(req, res) {
    try {
        const novaVenda = productService.cadastrarVenda(req.body);
        res.status(201).json({
            mensagem: "Venda adicionada com sucesso!",
            produto: novaVenda
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarVenda = cadastrarVenda;
;
function pesquisarVendaPorID(req, res) {
    try {
        const Venda = productService.consultarVenda(req.query.id);
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
exports.pesquisarVendaPorID = pesquisarVendaPorID;
;
function listaVendas(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.listaVendas = listaVendas;
;
