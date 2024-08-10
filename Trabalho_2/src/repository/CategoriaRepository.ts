import { executarComandoSQL } from "../database/mysql";
import { Categoria } from "../model/entity/Categoria";

export class CategoriaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertCategoria(title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Categoria>{
        const query = "INSERT INTO library.Categoria (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const Categoria = new Categoria(resultado.insertId, title);
            return new Promise<Categoria>((resolve)=>{
                resolve(Categoria);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateCategoria( id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Categoria>{
        const query = "UPDATE library.Categoria set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const Categoria = new Categoria(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Categoria>((resolve)=>{
                resolve(Categoria);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteCategoria(id?: number, title?:string, author?: string, publishedDate?: string, isbn?:string, pages?: number, language?: string, publisher?: string) :Promise<Categoria>{
        const query = "DELETE FROM library.Categoria  where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const Categoria = new Categoria(id, title, author, publishedDate, isbn, pages, language, publisher);
            return new Promise<Categoria>((resolve)=>{
                resolve(Categoria);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaId(id: number) :Promise<Categoria[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Categoria where id = ?" ;

        try {
            const resultado: Categoria[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id não encontrado");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Categoria[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaIsbn(isbn: string) :Promise<Categoria[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Categoria where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<Categoria[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllCategorias() :Promise<Categoria[]>{
        const query = "SELECT * FROM library.Categoria" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Categoria[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}