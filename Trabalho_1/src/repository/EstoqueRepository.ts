import { getEstoqueList, getItemVendaList, getModalidadeList, getVendaList } from "../global/database";
import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { ItemVenda, Venda } from "../model/Venda";

export class EstoqueRepository{
    productList: Modalidade[] = getModalidadeList();
    estoqueList: Estoque[] = getEstoqueList();
    vendaList: Venda[] = getVendaList();
    itemVendaList: ItemVenda[] = getItemVendaList()

    insereEstoque(estoque: Estoque){
        this.estoqueList.push(estoque);
        this.estoqueList.sort((a,b) => a.id - b.id);
    }

    filtraEstoquePorId(id:number): Estoque|undefined{
        return this.estoqueList.find(estoque => estoque.id === id);
    }

    filtraEstoquePorVenda(EstoqueId: number): ItemVenda|undefined{
        return this.itemVendaList.find(estoque => estoque.EstoqueId === EstoqueId);
    }

    filtraTodosEstoques():Estoque[]{
        return this.estoqueList;
    }

    deletaEstoque(estoque: Estoque) {
        const index = this.estoqueList.indexOf(estoque);
        if(index !== -1){
            this.estoqueList[index] = estoque ;
        }
        return index;
    }

    atualizaEstoque(estoque: Estoque): number{
        const index = this.estoqueList.indexOf(estoque) ;
        if(index !== -1){
            this.estoqueList[index] = estoque ;
        }
        return index;
    }
        
}