import express from "express";
import { cadastrarLivro, pesquisarLivroPorID, listaLivro, atualizarLivro, deletarLivro } from "./controller/BookController";

const app = express();
const PORT = process.env.PORT ?? 2000;
app.use(express.json());


function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}

app.post("/api/books", cadastrarLivro);
app.get("/api/books", pesquisarLivroPorID)
app.get("/api/books/todas", listaLivro)
app.put("/api/books", atualizarLivro ) ;
app.delete("/api/books/:id", deletarLivro ) ;


app.listen(PORT, logInfo);