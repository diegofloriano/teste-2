"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarLivro = exports.deletarLivro = exports.listaLivro = exports.pesquisarLivroPorID = exports.cadastrarLivro = void 0;
const BookService_1 = require("../service/BookService");
const productService = new BookService_1.BookService();
function cadastrarLivro(req, res) {
    try {
        const novoProduto = bookService.cadastrarLivro(req.body);
        res.status(201).json({
            mensagem: "Livro adicionado com sucesso!",
            produto: novoLivro
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.cadastrarLivro = cadastrarLivro;
;
function pesquisarLivroPorID(req, res) {
    try {
        const Modalidade = productService.consultarLivro(req.query.id);
        if (Modalidade) {
            res.status(200).json({
                mensagem: "Livro encontrado com sucesso!",
                Modalidade: Modalidade
            });
        }
        else {
            res.status(404).json({ mensagem: "Livro não encontrado." });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.pesquisarLivroPorID = pesquisarLivroPorID;
;
function listaLivro(req, res) {
    try {
        res.status(200).json(productService.getProducts());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.listaLivro = listaLivro;
;
function deletarLivro(req, res) {
    try {
        productService.deletarLivro(req.query.id);
        res.status(200).json({ message: "Livro deletado com sucesso !" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deletarLivro = deletarLivro;
;
function atualizarLivro(req, res) {
    try {
        const novoProduto = productService.atualizarLivro(req.body);
        res.status(201).json({
            mensagem: " Livro atualizado com sucesso !",
            produto: novoProduto
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.atualizarLivro = atualizarLivro;
;
