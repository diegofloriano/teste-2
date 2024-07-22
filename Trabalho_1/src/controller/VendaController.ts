import { Request, Response } from "express";
import { VendaService } from "../service/VendaService";
import { Venda } from "../model/Venda";
const vendaService = new VendaService();

export function cadastrarVenda(req: Request, res: Response){
    try {
        const novaVenda = vendaService.cadastrarVenda(req.body);
        res.status(201).json(
            {
                mensagem:"Venda adicionada com sucesso!",
                produto:novaVenda
            }
            );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function pesquisarVendaPorID (req: Request, res: Response){
    try {
        const Venda = vendaService.consultarVenda(req.query.id);
        if(Venda){
        res.status(200).json(
            {
                mensagem:"Venda encontrada com sucesso!",
                Venda: Venda
            }
            );
        }else{
            res.status(404).json({mensagem:"Venda não encontrada."});
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export function listaVendas(req: Request, res: Response){
    try {
        res.status(200).json(vendaService.getVendas());
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};


