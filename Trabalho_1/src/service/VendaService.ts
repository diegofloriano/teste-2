import { Estoque } from "../model/Estoque";
import { Venda } from "../model/Venda";
import { VendaRepository } from "../repository/VendaRepository";
import { ItemVenda } from "../model/Venda";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class VendaService{

    vendaRepository: VendaRepository = new VendaRepository();
    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarVenda(vendaData: any, itemData: any): Venda {
        const {id, total, cpf, itens} = vendaData
        if(!id|| !total || !cpf || !itens){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(id);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const { quantidade, EstoqueId} = itemData;
        if(!quantidade|| !EstoqueId){
            throw new Error("Informações incompletas");
        }
        let idEncontrado = this.consultarId(EstoqueId) ;
        if (!idEncontrado){
            throw new Error("Id nao encontrado !!!") ;
        }
        const novaVenda = new Venda(id, total,cpf, itens[itemData])
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }

    consultarVenda(id: any, undefined?: undefined): Venda|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.vendaRepository.filtraVendaPorId(idNumber);
    }

    consultarId(EstoqueId: number): Estoque|undefined{
        return this.estoqueRepository.filtraEstoquePorId(EstoqueId);
    }

    getProducts(): Venda[]{
       return this.vendaRepository.filtraTodasVendas();
    }
}

