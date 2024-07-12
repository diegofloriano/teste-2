import { idText } from "typescript";
import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { getEstoqueList, getModalidadeList, getVendaList } from "../global/database";
import { Venda } from "../model/Venda";

export class ProductRepository{
    productList: Modalidade[] = getModalidadeList();
    estoqueList: Estoque[] = getEstoqueList();
    vendaList: Venda[] = getVendaList();


    
    insereProduto(product: Modalidade){
        this.productList.push(product);
    }

    filtraProdutoPorId(id:number): Modalidade|undefined{
        return this.productList.find(product => product.id === id);
    }

    filtraModalidadePorId(ModalidadeId: number): Estoque|undefined{
        return this.estoqueList.find(product => product.id === ModalidadeId);
    }

    filtraTodosProdutos():Modalidade[]{
        return this.productList;
    }

    deletaProduto(produto: Modalidade) {
        const index = this.productList.indexOf(produto);
        if(index !== -1){
           this.productList.splice(index, 1);
        }
    }

    atualizaProduto(produto: Modalidade): number{
        const index = this.productList.indexOf(produto) ;
        if(index !== -1){
            this.productList[index] = produto ;
        }
        return index;
    }
        
}