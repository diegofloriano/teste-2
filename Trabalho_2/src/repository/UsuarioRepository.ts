import { executarComandoSQL } from "../database/mysql";
import { Usuario } from "../model/entity/Usuario";

export class UsuarioRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL,
            FOREING KEY (idPessoa) REFERENCES Pessoa(idPessoa),
            
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertUsuario(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Usuario>{
        const query = "INSERT INTO library.Usuario (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const Usuario = new Usuario(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Usuario>((resolve)=>{
                resolve(Usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateUsuario( id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Usuario>{
        const query = "UPDATE library.Usuario set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const Usuario = new Usuario(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Usuario>((resolve)=>{
                resolve(Usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteUsuario(id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Usuario>{
        const query = "DELETE FROM library.Usuario  where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const Usuario = new Usuario(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Usuario>((resolve)=>{
                resolve(Usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioId(id: number) :Promise<Usuario[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Usuario where id = ?" ;

        try {
            const resultado: Usuario[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id não encontrado");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Usuario[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioIsbn(isbn: string) :Promise<Usuario[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Usuario where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<Usuario[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllUsuarios() :Promise<Usuario[]>{
        const query = "SELECT * FROM library.Usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}