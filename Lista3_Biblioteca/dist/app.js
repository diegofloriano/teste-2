"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("./controller/BookController");
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 2000;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}
app.post("/api/books", BookController_1.cadastrarLivro);
app.get("/api/books", BookController_1.listarTodosLivro);
app.get("/api/books/:id", BookController_1.filtrarLivro);
app.put("/api/books/:id", BookController_1.atualizarLivro);
app.delete("/api/books/:id", BookController_1.deletarLivro);
app.listen(PORT, logInfo);
