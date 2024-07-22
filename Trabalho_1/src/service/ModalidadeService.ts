import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { ProductRepository } from "../repository/ModalidadeRepository";


export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

    cadastrarProduto(produtoData: any): Modalidade {
        const { nome, vegano} = produtoData;
        if(!nome || !vegano === undefined){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarProduto(undefined, nome);
        if(idExiste){
            throw new Error("Produto já Existente!");
        }
        const novoProduto = new Modalidade(nome, vegano);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }

    consultarProduto(id: any, nome: any): Modalidade|undefined{
        if(id && nome){
            console.log("Com ID e Nome");
            const idNumber: number = parseInt(id, 10);
            return this.productRepository.filtraProdutoPorNomeId(idNumber, nome);
        }

        else if(id){
            console.log("Com ID");
            const idNumber: number = parseInt(id, 10);
            return this.productRepository.filtraProdutoPorId(idNumber);
        }

        else if(nome){
            console.log("Nome");
            return this.productRepository.filtraProdutoPorNome(nome);
        }

        console.log(id)
        return undefined;
    }
       

    getProducts(): Modalidade[]{
       return this.productRepository.filtraTodosProdutos().sort((a,b) => a.id - b.id);;
    }

    deletarProduto(id: any){
        const product = this.consultarProduto(id, undefined);
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
        
        let produtoEncontrado = this.consultarProduto(id, undefined) ;
        if (!produtoEncontrado){
            throw new Error("Produto nao cadastrado !!!") ;
        }
        produtoEncontrado.nome = nome ;
        produtoEncontrado.vegano = vegano ;
        this.productRepository.atualizaProduto(produtoEncontrado);
        return produtoEncontrado;
        }

        consultarNome(id: number): string {
            const estoque = this.consultarProduto(id, undefined);
            if (estoque) {
                return estoque.nome;
            }
            throw new Error("Estoque não encontrado! m");
        }
        

}

