import { executarComandoSQL } from "../database/mysql";
import { Emprestimo } from "../model/entity/Emprestimo";

export class EmprestimoRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages DECIMAL(10,2) NOT NULL,
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertEmprestimo(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Emprestimo>{
        const query = "INSERT INTO library.Emprestimo (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const Emprestimo = new Emprestimo(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(Emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateEmprestimo( id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Emprestimo>{
        const query = "UPDATE library.Emprestimo set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const Emprestimo = new Emprestimo(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(Emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteEmprestimo(id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Emprestimo>{
        const query = "DELETE FROM library.Emprestimo  where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const Emprestimo = new Emprestimo(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(Emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoId(id: number) :Promise<Emprestimo[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Emprestimo where id = ?" ;

        try {
            const resultado: Emprestimo[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id não encontrado");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Emprestimo[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoIsbn(isbn: string) :Promise<Emprestimo[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Emprestimo where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<Emprestimo[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllEmprestimos() :Promise<Emprestimo[]>{
        const query = "SELECT * FROM library.Emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Emprestimo[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}