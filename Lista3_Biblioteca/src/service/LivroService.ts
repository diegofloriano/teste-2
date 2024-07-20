import { Modalidade } from "../model/Livro";
import { ProductRepository } from "../repository/ModalidadeRepository";


export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

    cadastrarLivro(produtoData: any): Modalidade {
        const { nome, vegano, id} = produtoData;
        if(!nome || !vegano === undefined || !id){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarLivro(id);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const novoProduto = new Modalidade(nome, vegano, id);
        this.productRepository.insereProduto(novoProduto);
        return novoProduto;
    }

    consultarLivro(id: any): Modalidade|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.productRepository.filtraProdutoPorId(idNumber);
    }

    getProducts(): Modalidade[]{
       return this.productRepository.filtraTodosProdutos();
    }

    deletarLivro(id: any){
        const product = this.consultarLivro(id);
        if (!product){
            throw new Error("Produto nao encontrado") ;
        }
        
        this.productRepository.deletaLivro(product);
    }

    atualizarLivro(produtoData: any): Modalidade{
        const {id, nome, vegano} = produtoData;
        if (!nome || !vegano === undefined ||!id){
            throw new Error("Informacoes incompletas");
        }
        
        let produtoEncontrado = this.consultarLivro(id) ;
        if (!produtoEncontrado){
            throw new Error("Produto nao cadastrado !!!") ;
        }
        produtoEncontrado.nome = nome ;
        produtoEncontrado.vegano = vegano ;
        this.productRepository.atualizaLivro(produtoEncontrado);
        return produtoEncontrado;
        }

        consultarNome(EstoqueId: number): string {
            const estoque = this.consultarLivro(EstoqueId);
            if (estoque) {
                return estoque.nome;
            }
            throw new Error("Estoque não encontrado!");
        }
        

}

