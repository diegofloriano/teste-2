import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Book } from "../model/Books";
import { BookRepository } from "../repository/PessoaRepository";

export class BookService {

    bookRepository: BookRepository = new BookRepository();

    async cadastrarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarLivro(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoLivro = await this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Book> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroAtualizado = await this.bookRepository.updateBook(id, title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Update", livroAtualizado);
        return livroAtualizado;
    }

    async deletarLivro(livroData: any): Promise<Book> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroDeletado = await this.bookRepository.deleteBook(id, title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Delete", livroDeletado);
        return livroDeletado;
    }

    async filtrarLivro(id: any, isbn: any): Promise<Book[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const livros: Book[]|undefined = await this.bookRepository.filterBookId(idNumber);  //você sempre recebe uma lista do mysql2 (Book[])
            if(livros?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", livros);
            return livros;
        }
        
        else if(isbn){
            const livros: Book[]|undefined = await this.bookRepository.filterBookIsbn(isbn);
            console.log("Service - Filtrar", livros);
            return livros;
        }

        return undefined;

    }
    
    async listarTodosLivros(): Promise<Book[]> {
        const livros = await this.bookRepository.filterAllBooks();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}