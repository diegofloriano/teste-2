"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarProduto = exports.deletarProduto = exports.listaProdutos = exports.pesquisarProdutoPorID = exports.cadastrarProduto = void 0;
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
exports.cadastrarProduto = cadastrarProduto;
;
function pesquisarProdutoPorID(req, res) {
    try {
        const Modalidade = productService.consultarProduto(req.query.id, req.query.nome);
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
exports.pesquisarProdutoPorID = pesquisarProdutoPorID;
;
function listaProdutos(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.listaProdutos = listaProdutos;
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
exports.deletarProduto = deletarProduto;
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
exports.atualizarProduto = atualizarProduto;
;
