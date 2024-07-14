import { getEstoqueList, getModalidadeList, getVendaList } from "../global/database";
import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { Venda } from "../model/Venda";

export class VendaRepository{
    productList: Modalidade[] = getModalidadeList();
    estoqueList: Estoque[] = getEstoqueList();
    vendaList: Venda[] = getVendaList();
    
    insereVenda(venda: Venda){
        this.vendaList.push(venda);
    }

    filtraVendaPorId(id:number): Venda|undefined{
        return this.vendaList.find(venda => venda.id === id);
    }

    filtraTodasVendas():Venda[]{
        return this.vendaList;
    }
}