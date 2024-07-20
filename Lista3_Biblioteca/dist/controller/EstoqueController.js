"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarEstoque = cadastrarEstoque;
exports.pesquisarEstoquePorID = pesquisarEstoquePorID;
exports.listaEstoques = listaEstoques;
exports.deletarEstoque = deletarEstoque;
exports.atualizarEstoque = atualizarEstoque;
const EstoqueService_1 = require("../service/EstoqueService");
const estoqueService = new EstoqueService_1.EstoqueService();
function cadastrarEstoque(req, res) {
    try {
        const novoEstoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json({
            mensagem: "Estoque adicionado com sucesso!",
            produto: novoEstoque
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function pesquisarEstoquePorID(req, res) {
    try {
        const Estoque = estoqueService.consultarEstoque(req.query.id);
        if (Estoque) {
            res.status(200).json({
                mensagem: "Estoque encontrado com sucesso!",
                Estoque: Estoque
            });
        }
        else {
            res.status(404).json({ mensagem: "Estoque não encontrado." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function listaEstoques(req, res) {
    try {
        res.status(200).json(estoqueService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function deletarEstoque(req, res) {
    try {
        const novoEstoque = estoqueService.deletarEstoque(req.body);
        res.status(201).json({
            mensagem: " Quantidade deletada com sucesso !",
            produto: novoEstoque
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function atualizarEstoque(req, res) {
    try {
        const novoEstoque = estoqueService.atualizarEstoque(req.body);
        res.status(201).json({
            mensagem: " Quantidade adicionada com sucesso !",
            produto: novoEstoque
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
