import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { ProductRepository } from "../repository/ModalidadeRepository";


export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

    cadastrarProduto(produtoData: any): Modalidade {
        const { nome, vegano, id} = produtoData;
        if(!nome || !vegano === undefined || !id){
            throw new Error("Informações incompletas");
        }
        const novoProduto = new Modalidade(nome, vegano, id);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }

    consultarProduto(id: any): Modalidade|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.productRepository.filtraProdutoPorId(idNumber);
    }

    consultarId(ModalidadeId: any): Estoque|undefined{
        const idNumber: number = parseInt(ModalidadeId, 10);
        console.log(ModalidadeId)
        return this.productRepository.filtraModalidadePorId(idNumber);
    }

    getProducts(): Modalidade[]{
       return this.productRepository.filtraTodosProdutos();
    }

    deletarProduto(id: any){
        const product = this.consultarProduto(id);
        if (!product){
            throw new Error("Produto nao encontrado") ;
        }
        
        this.productRepository.deletaProduto(product);
    }

    atualizarProduto(produtoData: any): Modalidade{
        const {id, nome, vegano} = produtoData;
        if (!nome || !vegano === undefined ||!id){
            throw new Error("Informacoes incompletas");
        }
        
        let produtoEncontrado = this.consultarProduto(id) ;
        if (!produtoEncontrado){
            throw new Error("Produto nao cadastrado !!!") ;
        }
        produtoEncontrado.nome = nome ;
        produtoEncontrado.vegano = vegano ;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
        }
        
}

