import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";

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
            FOREIGN KEY (categoriaId) REFERENCES Categoria(id)
           
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "INSERT INTO library.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
            console.log('livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "UPDATE library.Livro set titulo = ?, autor = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(livro:LivroEntity) :Promise<LivroEntity>{
        const query = "DELETE FROM library.Livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('livro deletado com sucesso: ', livro);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroById(id: number) :Promise<LivroEntity[]|undefined>{
        const query = "SELECT * FROM library.Livro where id = ?" ;

        try {
            const resultado: LivroEntity[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id do Livro não encontrado");
                throw new Error("Livro não existe");
            }
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

  
    async filterLivroByName(titulo: string) :Promise<LivroEntity[]|undefined>{
        const query = "SELECT * FROM library.Livro where titulo = ?" ;

        try {
            const resultado: LivroEntity[] = await executarComandoSQL(query, [titulo]);
            
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro ${titulo} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivro() :Promise<LivroEntity[]>{
        const query = "SELECT * FROM library.Livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<LivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }


}