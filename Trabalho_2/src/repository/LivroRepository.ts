import { executarComandoSQL } from "../database/mysql";
import { Livro } from "../model/entity/Livro";

export class LivroRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            categoriaId INT NOT NULL,
            FOREING KEY (categoriaId) REFERENCES Categoria(categoriaId)
           
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(titulo?:string, autor?: string, categoriaId?: number) :Promise<Livro>{
        const query = "INSERT INTO library.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [titulo, autor, categoriaId]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            const Livro = new Livro(resultado.insertId, titulo, autor, categoriaId);
            return new Promise<Livro>((resolve)=>{
                resolve(Livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateLivro( id?: number,titulo?:string, autor?: string, categoriaId?: number) :Promise<Livro>{
        const query = "UPDATE library.Livro set titulo = ?, autor = ?, categoriaId = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [titulo, autor, categoriaId, id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            const Livro = new Livro(id, titulo, autor, categoriaId);
            return new Promise<Livro>((resolve)=>{
                resolve(Livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(id?: number, titulo?:string, autor?: string, categoriaId?: number) :Promise<Livro>{
        const query = "DELETE FROM library.Livro  where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const Livro = new Livro(id, titulo, autor, categoriaId);
            return new Promise<Livro>((resolve)=>{
                resolve(Livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroId(id: number) :Promise<Livro[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Livro where id = ?" ;

        try {
            const resultado: Livro[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id não encontrado");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroIsbn(isbn: string) :Promise<Livro[]|undefined>{ //lista ou null
        const query = "SELECT * FROM library.Livro where isbn = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            console.log('Livro localizado com sucesso, ISBN: ', resultado);
            return new Promise<Livro[]|undefined>((resolve)=>{  //lista ou null
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ISBN ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivros() :Promise<Livro[]>{
        const query = "SELECT * FROM library.Livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }

    
}