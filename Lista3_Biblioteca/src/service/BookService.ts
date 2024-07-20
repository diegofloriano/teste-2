import { Livro } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";


export class BookService{

    productRepository: BookRepository = new BookRepository();

    cadastrarLivro(produtoData: any): Livro {
        const { nome, vegano, id} = produtoData;
        if(!nome || !vegano === undefined || !id){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarLivro(id);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const novoLivro = new Livro(nome, vegano, id);
        this.bookRepository.insereLivro(novoLivro);
        return novoLivro;
    }

    consultarLivro(id: any): Livro|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.bookRepository.filtraLivroPorId(idNumber);
    }

    getProducts(): Livro[]{
       return this.bookRepository.filtraTodosLivros();
    }

    deletarLivro(id: any){
        const product = this.consultarLivro(id);
        if (!product){
            throw new Error("Produto nao encontrado") ;
        }
        
        this.productRepository.deletaLivro(product);
    }

    atualizarLivro(produtoData: any): Livro{
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

