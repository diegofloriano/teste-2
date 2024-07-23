import { Book } from "../model/Books";
import { BookRepository } from "../repository/BookRepository";

export class BookService {

    bookRepository: BookRepository = new BookRepository();

    async cadastrarLivro(livroData: any): Promise<Book> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }

        let livroExiste = await this.consultarLivro(undefined, isbn);
        if (livroExiste) {
            throw new Error("Livro com ISBN já existente!");
        }

        const novoLivro = await this.bookRepository.insertBook(title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }

    async consultarLivro(id: number | undefined, isbn: string | undefined): Promise<Book | undefined> {
        if (id !== undefined) {
            console.log("Com ID");
            return await this.bookRepository.filterBookId(id);
        } else if (isbn) {
            console.log("ISBN");
            return await this.bookRepository.filterBookIsbn(isbn);
        }
        console.log("ID ou ISBN não fornecidos");
        return undefined;
    }

    async atualizarLivro(livroData: any): Promise<Book> {
        const { id, title, author, publishedDate, isbn, pages, language, publisher } = livroData;
        if (!id || !title || !author || !publishedDate || !isbn || !pages || !language || !publisher) {
            throw new Error("Informações incompletas");
        }

        let livroExiste = await this.consultarLivro(parseInt(id, 10), undefined);
        if (!livroExiste) {
            throw new Error("Livro não existente!");
        }

        const livroAtualizado = await this.bookRepository.updateBook(parseInt(id, 10), title, author, publishedDate, isbn, pages, language, publisher);
        console.log("Service - Update", livroAtualizado);
        return livroAtualizado;
    }

    async deletarLivro(id: any): Promise<void> {
        if (!id) {
            throw new Error("ID não fornecido");
        }
        const livroId = parseInt(id, 10);

        let livroExiste = await this.consultarLivro(livroId, undefined);
        if (!livroExiste) {
            throw new Error("Livro não existente!");
        }

        await this.bookRepository.deleteBook(livroId);
        console.log("Service - Delete", livroId);
    }

    async filtrarLivro(id: any): Promise<Book> {
        if (!id) {
            throw new Error("ID não fornecido");
        }
        const livroId = parseInt(id, 10);

        let livro = await this.consultarLivro(livroId, undefined);
        if (!livro) {
            throw new Error("Livro não existente!");
        }
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async listarTodosLivros(): Promise<Book[]> {
        const livros = await this.bookRepository.filterAllBooks();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}