import { getEstoqueList, getItemVendaList, getModalidadeList, getVendaList } from "../global/database";
import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { ItemVenda, Venda } from "../model/Venda";

export class VendaRepository{
    productList: Modalidade[] = getModalidadeList();
    estoqueList: Estoque[] = getEstoqueList();
    vendaList: Venda[] = getVendaList();
    itemVendaList: ItemVenda[] = getItemVendaList()

    
    insereVenda(venda: Venda){
        this.vendaList.push(venda);
        this.productList.sort((a,b) => a.id - b.id);
    }

    filtraVendaPorId(id:number): Venda|undefined{
        return this.vendaList.find(venda => venda.id === id);
    }

    filtraTodasVendas():Venda[]{
        return this.vendaList;
    }
}