"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarPao = exports.deletarPao = exports.listaPaes = exports.pesquisarPaoPorID = exports.cadastrarPao = void 0;
const ProductService_1 = require("../service/ProductService");
const productService = new ProductService_1.ProductService();
function cadastrarPao(req, res) {
    try {
        const novoPao = productService.cadastrarPao(req.body);
        res.status(201).json({
            mensagem: "Pao adicionado com sucesso!",
            produto: novoPao
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarPao = cadastrarPao;
;
function pesquisarPaoPorID(req, res) {
    try {
        const ModalidadePaes = productService.consultarPao(req.query.id);
        if (ModalidadePaes) {
            res.status(200).json({
                mensagem: "Pao encontrado com sucesso!",
                ModalidadePaes: ModalidadePaes
            });
        }
        else {
            res.status(404).json({ mensagem: "Pao não encontrado." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.pesquisarPaoPorID = pesquisarPaoPorID;
;
function listaPaes(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.listaPaes = listaPaes;
;
function deletarPao(req, res) {
    try {
        productService.deletarPao(req.query.id);
        res.status(200).json({ message: " Pao deletado com sucesso !" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deletarPao = deletarPao;
;
function atualizarPao(req, res) {
    try {
        const novoPao = productService.atualizarPao(req.body);
        res.status(201).json({
            mensagem: " Pao atualizado com sucesso !",
            pao: novoPao
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.atualizarPao = atualizarPao;
;
