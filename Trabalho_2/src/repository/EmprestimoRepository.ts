import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

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
            FOREIGN KEY (livroId) REFERENCES Livro(livroId),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(usuarioId)
            
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "INSERT INTO library.Emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('emprestimo inserido com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir o emprestimo:', err);
            throw err;
        }
    }

    async updateEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "UPDATE library.Emprestimo set dataEmprestimo = ?, dataDevolucao = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.id]);
            console.log('emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteEmprestimo(emprestimo:EmprestimoEntity) :Promise<EmprestimoEntity>{
        const query = "DELETE FROM library.Emprestimo where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log('emprestimo deletado com sucesso: ', emprestimo);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoById(id: number) :Promise<EmprestimoEntity>{
        const query = "SELECT * FROM library.Emprestimo where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimoByName(titulo: string) :Promise<EmprestimoEntity[]>{
        const query = "SELECT * FROM library.Emprestimo where titulo = ?" ;

        try {
            const resultado:EmprestimoEntity[] = await executarComandoSQL(query, [titulo]);
            console.log('emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o emprestimo ${titulo} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllEmprestimo() :Promise<EmprestimoEntity[]>{
        const query = "SELECT * FROM library.Emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<EmprestimoEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os emprestimos gerando o erro: ${err}`);
            throw err;
        }
    }


}