import { Venda } from "../model/Venda";

export class ProductRepository{
    productList: Venda[] = [];
    
    insereVenda(product: Venda){
        this.productList.push(product);
    }

    filtraVendaPorId(id:number): Venda|undefined{
        return this.productList.find(product => product.id === id);
    }

    filtraTodasVendas():Venda[]{
        return this.productList;
    }
}