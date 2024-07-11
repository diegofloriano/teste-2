import { Modalidade } from "../model/Modalidade";
import { ProductRepository } from "../repository/ModalidadeRepository";
export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

    cadastrarProduto(produtoData: any): Modalidade {
        const { nome, vegano, id, preco } = produtoData;
        if(!nome || !vegano === undefined || !id || !preco){
            throw new Error("Informações incompletas");
        }
        const novoProduto = new Modalidade(nome, vegano, id, preco);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }

    consultarProduto(id: any): Modalidade|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.productRepository.filtraProdutoPorId(idNumber);
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
        const {id, nome, vegano, preco} = produtoData;
        if (!nome || !vegano === undefined ||!id || !preco){
            throw new Error("Informacoes incompletas");
        }
        
        let produtoEncontrado = this.consultarProduto(id) ;
        if (!produtoEncontrado){
            throw new Error("Produto nao cadastrado !!!") ;
        }
        produtoEncontrado.nome = nome ;
        produtoEncontrado.vegano = vegano ;
        produtoEncontrado.preco = preco ;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
        }
        
}

