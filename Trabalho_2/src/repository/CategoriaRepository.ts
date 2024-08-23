import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class CategoriaRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
            
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertCategoria(categoria: CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "INSERT INTO library.Categoria (nome) VALUES (?)" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.nome]);
            console.log('Categoria inserida com sucesso, ID: ', resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err) {
            console.error('Erro ao inserir a categoria:', err);
            throw err;
        }
    }

    async updateCategoria(categoria:CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "UPDATE library.Categoria set nome = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.nome, categoria.id]);
            console.log('categoria atualizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteCategoria(categoria:CategoriaEntity) :Promise<CategoriaEntity>{
        const query = "DELETE FROM library.Categoria where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.id]);
            console.log('categoria deletada com sucesso: ', categoria);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaById(id: number) :Promise<CategoriaEntity[]|undefined>{
        const query = "SELECT * FROM library.Categoria where id = ?" ;

        try {
            const resultado: CategoriaEntity[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id da Categoria não encontrada");
            }
            console.log('categoria localizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity[]|undefined>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a categoria de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaByName(nome: string) :Promise<CategoriaEntity[]>{
        const query = "SELECT * FROM library.Categoria where nome = ?" ;

        try {
            const resultado:CategoriaEntity[] = await executarComandoSQL(query, [nome]);
            console.log('categoria localizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a categoria ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllCategoria() :Promise<CategoriaEntity[]>{
        const query = "SELECT * FROM library.Categoria" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<CategoriaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }
    }


}