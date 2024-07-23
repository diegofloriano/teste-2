"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarTodosLivro = exports.filtrarLivro = exports.deletarLivro = exports.atualizarLivro = exports.cadastrarLivro = void 0;
const BookService_1 = require("../service/BookService");
const bookService = new BookService_1.BookService();
function cadastrarLivro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const novoLivro = yield bookService.cadastrarLivro(req.body);
            res.status(201).json({
                mensagem: "Livro adicionado com sucesso!",
                livro: novoLivro
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.cadastrarLivro = cadastrarLivro;
;
function atualizarLivro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const livro = yield bookService.atualizarLivro(req.body);
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso!",
                livro: livro
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.atualizarLivro = atualizarLivro;
;
function deletarLivro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const livro = yield bookService.deletarLivro(req.body);
            res.status(200).json({
                mensagem: "Livro deletado com sucesso!",
                livro: livro
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.deletarLivro = deletarLivro;
;
function filtrarLivro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const livro = yield bookService.filtrarLivro(req.query.id);
            res.status(200).json({
                mensagem: "Livro encontrado com sucesso!",
                livro: livro
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.filtrarLivro = filtrarLivro;
;
function listarTodosLivro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const livros = yield bookService.listarTodosLivros();
            res.status(200).json({
                mensagem: "Livros listados com sucesso!",
                livros: livros
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.listarTodosLivro = listarTodosLivro;
;
