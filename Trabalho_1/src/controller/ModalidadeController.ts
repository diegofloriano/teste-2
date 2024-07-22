import { Request, Response } from "express";
import { ProductService } from "../service/ModalidadeService";
import { Modalidade } from "../model/Modalidade";
const productService = new ProductService();

export function cadastrarProduto(req: Request, res: Response){
    try {
        const novoProduto = productService.cadastrarProduto(req.body);
        res.status(201).json(
            {
                mensagem:"Produto adicionado com sucesso!",
                produto:novoProduto
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function pesquisarProdutoPorID (req: Request, res: Response){
    try {
        const Modalidade = productService.consultarProduto(req.query.id, req.query.nome);
        if(Modalidade){
        res.status(200).json(
            {
                mensagem:"Produto encontrado com sucesso!",
                Modalidade: Modalidade
            }
            );
        }else{
            res.status(404).json({mensagem:"Produto não encontrado."});
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function listaProdutos(req: Request, res: Response){
    try {
        res.status(200).json(productService.getProducts());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function deletarProduto (req: Request, res: Response) {
    try {
        productService.deletarProduto(req.query.id);
        res.status(200).json({message:"Produto deletado com sucesso !"}) ;
    } catch (error: any ){
        res.status(400).json({message : error.message});
    }
};

export function atualizarProduto(req: Request, res: Response){
    try {
        const novoProduto = productService.atualizarProduto(req.body);
        res.status(201).json(
        {
        mensagem:" Produto atualizado com sucesso !",
        produto: novoProduto
        }
        );
    } catch(error: any){
        res.status(400).json({message: error.message}) ;
    }
};
    