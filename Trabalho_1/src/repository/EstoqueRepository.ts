import { Estoque } from "../model/Estoque";

export class EstoqueRepository{
    estoqueList: Estoque[] = [];
    
    insereEstoque(product: Estoque){
        this.estoqueList.push(product);
    }

    filtraEstoquePorId(id:number): Estoque|undefined{
        return this.estoqueList.find(product => product.id === id);
    }

    filtraTodosEstoques():Estoque[]{
        return this.estoqueList;
    }

    deletaEstoque(produto: Estoque) {
        const index = this.estoqueList.indexOf(produto);
        if(index !== -1){
            this.estoqueList[index] = produto ;
        }
        return index;
    }

    atualizaEstoque(produto: Estoque): number{
        const index = this.estoqueList.indexOf(produto) ;
        if(index !== -1){
            this.estoqueList[index] = produto ;
        }
        return index;
    }
        
}