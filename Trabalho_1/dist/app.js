"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ModalidadeController_1 = require("./controller/ModalidadeController");
const EstoqueController_1 = require("./controller/EstoqueController");
const VendaController_1 = require("./controller/VendaController");
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}
app.post("/api/estoque", EstoqueController_1.cadastrarEstoque);
app.get("/api/estoque", EstoqueController_1.pesquisarEstoquePorID);
app.get("/api/estoque/todas", EstoqueController_1.listaEstoques);
app.put("/api/estoque", EstoqueController_1.atualizarEstoque);
app.delete("/api/estoque", EstoqueController_1.deletarEstoque);
app.post("/api/modalidade", ModalidadeController_1.cadastrarProduto);
app.get("/api/modalidade", ModalidadeController_1.pesquisarProdutoPorID);
app.get("/api/modalidade/todas", ModalidadeController_1.listaProdutos);
app.put("/api/modalidade", ModalidadeController_1.atualizarProduto);
app.delete("/api/modalidade", ModalidadeController_1.deletarProduto);
app.post("/api/vendas", VendaController_1.cadastrarVenda);
app.get("/api/vendas", VendaController_1.pesquisarVendaPorID);
app.get("/api/vendas/todas", VendaController_1.listaVendas);
app.listen(PORT, logInfo);
