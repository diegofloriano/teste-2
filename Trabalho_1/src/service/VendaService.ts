import { ItemVenda, Venda } from "../model/Venda";
import { ProductRepository } from "../repository/VendaRepository";
export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

    cadastrarVenda(vendaData: any): Venda {
        const { id, cpf, total, itens,quantidade, EstoqueId, preco } = vendaData;
        if(!id || !cpf || !total || !itens|| !quantidade|| !EstoqueId|| !preco ){
            throw new Error("Informações incompletas");
        }
        const novoProduto = new Venda(id, cpf, total, itens);
        this.productRepository.insereVenda(novoProduto);
        return novoProduto;
    }

    consultarVenda(id: any, undefined?: undefined): Venda|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.productRepository.filtraVendaPorId(idNumber);
    }

    getProducts(): Venda[]{
       return this.productRepository.filtraTodasVendas();
    }
}

