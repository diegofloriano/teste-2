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
exports.BookRepository = void 0;
const mysql_1 = require("../database/mysql");
const Books_1 = require("../model/Books");
class BookRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        CREATE TABLE IF NOT EXISTS Vendas.Product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Query executada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertProduct(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO vendas.Product (name, price) VALUES (?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [name, price]);
                console.log('Produto inserido com sucesso, ID: ', resultado.insertId);
                const product = new Books_1.Book(resultado.insertId, name, price);
                return new Promise((resolve) => {
                    resolve(product);
                });
            }
            catch (err) {
                console.error('Erro ao inserir o produto:', err);
                throw err;
            }
        });
    }
    updateProduct(id, name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE vendas.product set name = ?, price = ? where id = ?;";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [name, price, id]);
                console.log('Produto atualizado com sucesso, ID: ', resultado);
                const product = new Books_1.Book(id, name, price);
                return new Promise((resolve) => {
                    resolve(product);
                });
            }
            catch (err) {
                console.error(`Erro ao atualizar o produto de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    deleteProduct(id, name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM vendas.product where id = ?;";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Produto deletado com sucesso, ID: ', resultado);
                const product = new Books_1.Book(id, name, price);
                return new Promise((resolve) => {
                    resolve(product);
                });
            }
            catch (err) {
                console.error(`Falha ao deletar o produto de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM vendas.product where id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Produto localizado com sucesso, ID: ', resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM vendas.product";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
                throw err;
            }
        });
    }
}
exports.BookRepository = BookRepository;
