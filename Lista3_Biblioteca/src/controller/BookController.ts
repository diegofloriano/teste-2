import { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { Livro } from "../model/Books";
const productService = new BookService();

export function cadastrarLivro(req: Request, res: Response){
    try {
        const novoProduto = bookService.cadastrarLivro(req.body);
        res.status(201).json(
            {
                mensagem:"Livro adicionado com sucesso!",
                produto:novoLivro
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function pesquisarLivroPorID (req: Request, res: Response){
    try {
        const Modalidade = productService.consultarLivro(req.query.id);
        if(Modalidade){
        res.status(200).json(
            {
                mensagem:"Livro encontrado com sucesso!",
                Modalidade: Modalidade
            }
            );
        }else{
            res.status(404).json({mensagem:"Livro não encontrado."});
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function listaLivro(req: Request, res: Response){
    try {
        res.status(200).json(productService.getProducts());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function deletarLivro (req: Request, res: Response) {
    try {
        productService.deletarLivro(req.query.id);
        res.status(200).json({message:"Livro deletado com sucesso !"}) ;
    } catch (error: any ){
        res.status(400).json({message : error.message});
    }
};

export function atualizarLivro(req: Request, res: Response){
    try {
        const novoProduto = productService.atualizarLivro(req.body);
        res.status(201).json(
        {
        mensagem:" Livro atualizado com sucesso !",
        produto: novoProduto
        }
        );
    } catch(error: any){
        res.status(400).json({message: error.message}) ;
    }
};
    