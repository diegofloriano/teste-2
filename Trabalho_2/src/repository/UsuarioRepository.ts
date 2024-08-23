import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            senha VARCHAR(255) NOT NULL,
            idPessoa INT NOT NULL,
            FOREIGN KEY (idPessoa) REFERENCES library.Pessoa(id)
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "INSERT INTO library.Usuario (senha, idPessoa) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.senha, usuario.idPessoa ]);
            console.log('usuario inserido com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o usuario:', err);
            throw err;
        }
    }

    async updateUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "UPDATE library.Usuario set senha = ?, idPessoa = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.senha, usuario.idPessoa, usuario.id]);
            console.log('usuario atualizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteUsuario(usuario:UsuarioEntity) :Promise<UsuarioEntity>{
        const query = "DELETE FROM library.Usuario where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('usuario deletado com sucesso: ', usuario);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioById(id: number) :Promise<UsuarioEntity[]|undefined>{
        const query = "SELECT * FROM library.Usuario where id = ?" ;

        try {
            const resultado: UsuarioEntity[] = await executarComandoSQL(query, [id]);
            if(resultado.length === 0){
                console.error("Id do Usuario não encontrado");
            }
            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity[]|undefined>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o usuario de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioByName(nome: string) :Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM library.Usuario where nome = ?" ;

        try {
            const resultado:UsuarioEntity[] = await executarComandoSQL(query, [nome]);
            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o usuario ${nome} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllUsuario() :Promise<UsuarioEntity[]>{
        const query = "SELECT * FROM library.Usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }


    }