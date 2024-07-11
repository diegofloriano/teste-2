"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarPao = cadastrarPao;
exports.pesquisarPaoPorID = pesquisarPaoPorID;
exports.listaPaes = listaPaes;
exports.deletarPao = deletarPao;
exports.atualizarPao = atualizarPao;
const ModalidadeService_1 = require("../service/ModalidadeService");
const productService = new ModalidadeService_1.ProductService();
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
;
function listaPaes(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
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
;
