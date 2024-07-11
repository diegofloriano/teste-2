import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";
import { Estoque } from "../model/Estoque";
const estoqueService = new EstoqueService();

export function cadastrarEstoque(req: Request, res: Response){
    try {
        const novoEstoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json(
            {
                mensagem:"Estoque adicionado com sucesso!",
                produto:novoEstoque
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function pesquisarEstoquePorID (req: Request, res: Response){
    try {
        const Estoque = estoqueService.consultarEstoque(req.query.id);
        if(Estoque){
        res.status(200).json(
            {
                mensagem:"Estoque encontrado com sucesso!",
                Estoque: Estoque
            }
            );
        }else{
            res.status(404).json({mensagem:"Estoque não encontrado."});
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function listaEstoques(req: Request, res: Response){
    try {
        res.status(200).json(estoqueService.getProducts());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function deletarEstoque (req: Request, res: Response) {
    try {
        estoqueService.deletarEstoque(req.query.id);
        res.status(200).json({message:"Estoque deletado com sucesso !"}) ;
    } catch (error: any ){
        res.status(400).json({message : error.message});
    }
};

export function atualizarEstoque(req: Request, res: Response){
    try {
        const novoEstoque = estoqueService.atualizarEstoque(req.body);
        res.status(201).json(
        {
        mensagem:" Estoque atualizado com sucesso !",
        produto: novoEstoque
        }
        );
    } catch(error: any){
        res.status(400).json({message: error.message}) ;
    }
};
    