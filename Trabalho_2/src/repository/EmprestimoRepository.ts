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
            livroId INT NOT NULL,
            usuarioId INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL,
            FOREING KEY (livroId) REFERENCES Livro(livroId),
            FOREING KEY (usuarioId) REFERENCES Usuario(usuarioId)
            
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(livro:Livro) :Promise<Livro>{
        const query = "INSERT INTO library.Livro (id, titulo, autor, categoriaId) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id, livro.titulo, livro.autor, livro.categoriaId]);
            console.log('livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async updateLivro(livro:Livro) :Promise<Livro>{
        const query = "UPDATE library.Livro set titulo = ?, autor = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(livro:Livro) :Promise<Livro>{
        const query = "DELETE FROM library.Livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('livro deletado com sucesso: ', livro);
            return new Promise<Livro>((resolve)=>{
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroById(id: number) :Promise<Livro>{
        const query = "SELECT * FROM library.Livro where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByName(titulo: string) :Promise<Livro[]>{
        const query = "SELECT * FROM library.Livro where titulo = ?" ;

        try {
            const resultado:Livro[] = await executarComandoSQL(query, [titulo]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o livro ${titulo} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivro() :Promise<Livro[]>{
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