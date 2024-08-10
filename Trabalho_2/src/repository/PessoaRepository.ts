import { executarComandoSQL } from "../database/mysql";
import { Pessoa } from "../model/entity/Pessoa";

export class PessoaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertPessoa(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Pessoa>{
        const query = "INSERT INTO library.Pessoa (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const Pessoa = new Pessoa(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Pessoa>((resolve)=>{
                resolve(Pessoa);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updatePessoa( id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Pessoa>{
        const query = "UPDATE library.Pessoa set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const Pessoa = new Pessoa(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Pessoa>((resolve)=>{
                resolve(Pessoa);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletePessoa(id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Pessoa>{
        const query = "DELETE FROM library.Pessoa  where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const Pessoa = new Pessoa(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Pessoa>((resolve)=>{
                resolve(Pessoa);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaId(id: number) :Promise<Pessoa[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Pessoa where id = ?" ;

        try {
            const resultado: Pessoa[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id não encontrado");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Pessoa[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaIsbn(isbn: string) :Promise<Pessoa[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Pessoa where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<Pessoa[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllPessoas() :Promise<Pessoa[]>{
        const query = "SELECT * FROM library.Pessoa" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}