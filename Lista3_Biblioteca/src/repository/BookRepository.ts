import { executarComandoSQL } from "../database/mysql";
import { Book } from "../model/Books";

export class BookRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Book (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages DECIMAL(10,2) NOT NULL
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL,
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertBook(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Book>{
        const query = "INSERT INTO library.Book (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const book = new Book(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Book>((resolve)=>{
                resolve(book);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateBook( id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Book>{
        const query = "UPDATE library.book set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id, title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const book = new Book(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Book>((resolve)=>{
                resolve(book);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteBook(id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Book>{
        const query = "DELETE FROM library.book where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const book = new Book(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Book>((resolve)=>{
                resolve(book);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterBook(id: number) :Promise<Book>{
        const query = "SELECT * FROM library.book where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Book>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllBooks() :Promise<Book[]>{
        const query = "SELECT * FROM library.book" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Book[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}