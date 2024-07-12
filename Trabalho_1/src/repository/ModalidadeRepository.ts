import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";

export class ProductRepository{
    productList: Modalidade[] = [];
    
    insereProduto(product: Modalidade){
        this.productList.push(product);
    }

    filtraProdutoPorId(id:number): Modalidade|undefined{
        return this.productList.find(product => product.id === id);
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