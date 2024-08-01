import express from "express";
import { cadastrarLivro, listarTodosLivro, filtrarLivro, atualizarLivro, deletarLivro } from "./controller/BookController";

const app = express();
const PORT = process.env.PORT ?? 2000;
app.use(express.json());


function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}

app.post("/api/books", cadastrarLivro);
app.get("/api/books", listarTodosLivro)
app.get("/api/books/:id", filtrarLivro)
app.put("/api/books/:id", atualizarLivro ) ;
app.delete("/api/books/:id", deletarLivro ) ;


app.listen(PORT, logInfo);