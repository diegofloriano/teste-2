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

    async insertPessoa(pessoa:Pessoa) :Promise<Pessoa>{
        const query = "INSERT INTO library.Pessoa (id, nome, email) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.id, pessoa.nome, pessoa.email]);
            console.log('Pessoa inserida com sucesso, ID: ', resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err) {
            console.error('Erro ao inserir a pessoa:', err);
            throw err;
        }
    }

    async updatePessoa(pessoa:Pessoa) :Promise<Pessoa>{
        const query = "UPDATE library.Pessoa set nome = ?, email = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email, pessoa.id]);
            console.log('Pessoa atualizada com sucesso, ID: ', resultado);
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletePessoa(pessoa:Pessoa) :Promise<Pessoa>{
        const query = "DELETE FROM library.Pessoa where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.id]);
            console.log('Pessoa deletada com sucesso: ', pessoa);
            return new Promise<Pessoa>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaById(id: number) :Promise<Pessoa>{
        const query = "SELECT * FROM library.Pessoa where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Pessoa localizada com sucesso, ID: ', resultado);
            return new Promise<Pessoa>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a pessoa de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPessoaByName(nome: string) :Promise<Pessoa[]>{
        const query = "SELECT * FROM library.Pessoa where nome = ?" ;

        try {
            const resultado:Pessoa[] = await executarComandoSQL(query, [nome]);
            console.log('Pessoa localizada com sucesso, Nome: ', resultado);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a pessoa ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllPessoa() :Promise<Pessoa[]>{
        const query = "SELECT * FROM library.Pessoa" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as pessoas gerando o erro: ${err}`);
            throw err;
        }
    }


}