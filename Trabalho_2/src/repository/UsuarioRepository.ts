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
            FOREING KEY (idPessoa) REFERENCES Usuario(idPessoa),
            
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertUsuario(usuario:Usuario) :Promise<Usuario>{
        const query = "INSERT INTO library.Usuario (id, idPessoa, senha) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id, usuario.idPessoa, usuario.senha]);
            console.log('usuario inserido com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o usuario:', err);
            throw err;
        }
    }

    async updateUsuario(usuario:Usuario) :Promise<Usuario>{
        const query = "UPDATE library.Usuario set idPessoa = ?, senha = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha, usuario.id]);
            console.log('usuario atualizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteUsuario(usuario:Usuario) :Promise<Usuario>{
        const query = "DELETE FROM library.Usuario where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('usuario deletado com sucesso: ', usuario);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioById(id: number) :Promise<Usuario>{
        const query = "SELECT * FROM library.Usuario where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o usuario de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioByName(nome: string) :Promise<Usuario[]>{
        const query = "SELECT * FROM library.Usuario where nome = ?" ;

        try {
            const resultado:Usuario[] = await executarComandoSQL(query, [nome]);
            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o usuario ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllUsuario() :Promise<Usuario[]>{
        const query = "SELECT * FROM library.Usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }


    }