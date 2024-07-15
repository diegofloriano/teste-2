import { Estoque } from "../model/Estoque";
import { Venda } from "../model/Venda";
import { VendaRepository } from "../repository/VendaRepository";
import { ItemVenda } from "../model/Venda";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class VendaService{

    vendaRepository: VendaRepository = new VendaRepository();
    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarVenda(vendaData: any): ItemVenda {
        const { quantidade, EstoqueId} = vendaData;
        if(!quantidade|| !EstoqueId){
            throw new Error("Informações incompletas");
        }
        let idEncontrado = this.consultarId(EstoqueId) ;
        if (!idEncontrado){
            throw new Error("Id nao encontrado !!!") ;
        }
        const novoItem = new ItemVenda(EstoqueId, quantidade)
        this.vendaRepository.insereVenda(novoItem);
        return novoItem;
    }

    consultarVenda(id: any, undefined?: undefined): Venda|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.vendaRepository.filtraVendaPorId(idNumber);
    }

    consultarId(EstoqueId: number): ItemVenda|undefined{
        return this.estoqueRepository.filtraEstoquePorVenda(EstoqueId);
    }

    getProducts(): Venda[]{
       return this.vendaRepository.filtraTodasVendas();
    }
}

