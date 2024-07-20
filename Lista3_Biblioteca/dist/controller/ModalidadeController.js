"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarProduto = cadastrarProduto;
exports.pesquisarProdutoPorID = pesquisarProdutoPorID;
exports.listaProdutos = listaProdutos;
exports.deletarProduto = deletarProduto;
exports.atualizarProduto = atualizarProduto;
const ModalidadeService_1 = require("../service/ModalidadeService");
const productService = new ModalidadeService_1.ProductService();
function cadastrarProduto(req, res) {
    try {
        const novoProduto = productService.cadastrarProduto(req.body);
        res.status(201).json({
            mensagem: "Produto adicionado com sucesso!",
            produto: novoProduto
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function pesquisarProdutoPorID(req, res) {
    try {
        const Modalidade = productService.consultarProduto(req.query.id);
        if (Modalidade) {
            res.status(200).json({
                mensagem: "Produto encontrado com sucesso!",
                Modalidade: Modalidade
            });
        }
        else {
            res.status(404).json({ mensagem: "Produto não encontrado." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function listaProdutos(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function deletarProduto(req, res) {
    try {
        productService.deletarProduto(req.query.id);
        res.status(200).json({ message: "Produto deletado com sucesso !" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
function atualizarProduto(req, res) {
    try {
        const novoProduto = productService.atualizarProduto(req.body);
        res.status(201).json({
            mensagem: " Produto atualizado com sucesso !",
            produto: novoProduto
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
;
