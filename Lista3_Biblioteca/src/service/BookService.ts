import { Livro } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";


export class BookService{

    productRepository: BookRepository = new BookRepository();

    cadastrarLivro(livroData: any): Livro {
        const { title, isbn } = livroData;
        if(!title || !isbn){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarLivro(isbn);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const novoLivro = new Livro(isbn);
        this.bookRepository.insereLivro(novoLivro);
        return novoLivro;
    }

    consultarLivro(isbn: any): Livro|undefined{
        const idNumber: number = parseInt(isbn, 10);
        console.log(id)
        return this.bookRepository.filtraLivroPorId(idNumber);
    }

    getProducts(): Livro[]{
       return this.bookRepository.filtraTodosLivros();
    }

    deletarLivro(isbn: any){
        const product = this.consultarLivro(isbn);
        if (!product){
            throw new Error("Produto nao encontrado") ;
        }
        
        this.productRepository.deletaLivro(product);
    }

    atualizarLivro(livroData: any): Livro{
        const {id, nome, vegano} = livroData;
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

}

