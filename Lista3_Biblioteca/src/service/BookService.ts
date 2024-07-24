import { Book } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";

export class BookService {

    bookRepository: BookRepository = new BookRepository();

    async cadastrarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
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

    async deletarLivro(id: any): Promise<void> {
        if (!id) {
            throw new Error("ID não fornecido");
        }
        const livroId = parseInt(id, 10);


        await this.bookRepository.deleteBook(livroId);
        console.log("Service - Delete", livroId);
    }

    async filtrarLivro(livroData: any): Promise<Book> {
        if (!livroData) {
            throw new Error("ID não fornecido");
        }
        const id = parseInt(livroData, 10);

        const livro = await this.bookRepository.filterBookId(id);
        console.log("Service - Filtrar", livro);
        return livro;
    }
    
    async listarTodosLivros(): Promise<Book[]> {
        const livros = await this.bookRepository.filterAllBooks();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}