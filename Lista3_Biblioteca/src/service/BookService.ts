import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Book } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";

export class BookService {

    bookRepository: BookRepository = new BookRepository();

    async cadastrarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarLivro(undefined, isbn);
        console.log(existe);
        if(existe){
            throw new Error("ISBN já existe!");
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


        const livroAtualizado = await this.bookRepository.updateBook(id, title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Update", livroAtualizado);
        return livroAtualizado;
    }

    async deletarLivro(livroData: any): Promise<Book> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }


        const livroDeletado = await this.bookRepository.deleteBook(id, title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Delete", livroDeletado);
        return livroDeletado;
    }

    async filtrarLivro(id: any, isbn: any): Promise<Book[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const livros: Book[]|undefined = await this.bookRepository.filterBookId(idNumber);
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