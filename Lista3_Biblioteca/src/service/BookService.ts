import { Book } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";

export class BookService{

    bookRepository: BookRepository = new BookRepository();

    async cadastrarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if(!title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const novoLivro =  await this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if(!title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const livro =  await this.bookRepository.updateBook(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if(!title || !author || !publishedDate || !isbn || !pages || !language || !publisher ){
            throw new Error("Informações incompletas");
        }

        const livro =  await this.bookRepository.deleteBook(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async filtrarLivro(livroData: any): Promise<Book> {
        if(!livroData ){
            throw new Error("Informações incompletas");
        }
        const id = parseInt(livroData, 10);

        const livro =  await this.bookRepository.filterBook(id);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async listarTodosLivros(): Promise<Book[]> {
        const livro =  await this.bookRepository.filterAllBooks();
        console.log("Service - Filtrar Todos", livro);
        return livro;
    }

}