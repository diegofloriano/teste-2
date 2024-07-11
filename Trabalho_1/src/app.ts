import express from "express";
import { cadastrarProduto, pesquisarProdutoPorID, listaProdutos, atualizarProduto, deletarProduto } from "./controller/ModalidadeController";
import { atualizarEstoque, cadastrarEstoque, listaEstoques, pesquisarEstoquePorID, deletarEstoque } from "./controller/EstoqueController";
import { cadastrarVenda, listaVendas, pesquisarVendaPorID } from "./controller/VendaController";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());


function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}

app.post("/api/estoque", cadastrarEstoque);
app.get("/api/estoque", pesquisarEstoquePorID)
app.get("/api/estoque/todas", listaEstoques)
app.put("/api/estoque", atualizarEstoque ) ;
app.delete("/api/estoque", deletarEstoque ) ;

app.post("/api/modalidade", cadastrarProduto);
app.get("/api/modalidade", pesquisarProdutoPorID)
app.get("/api/modalidade/todas", listaProdutos)
app.put("/api/modalidade", atualizarProduto ) ;
app.delete("/api/modalidade", deletarProduto ) ;

app.post("/api/Vendas", cadastrarVenda);
app.get("/api/Vendas", pesquisarVendaPorID)
app.get("/api/Vendas/todas", listaVendas)




app.listen(PORT, logInfo);