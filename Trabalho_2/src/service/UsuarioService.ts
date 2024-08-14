import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Usuario } from "../model/entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {

    UsuarioRepository: UsuarioRepository = new UsuarioRepository();

    async cadastrarLivro(usuarioData: any): Promise<Usuario> {
        const { nome, email, senha } = usuarioData;
        if (!nome || !email || !senha) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarLivro(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoUsuario = await this.UsuarioRepository.insertUsuario(nome, email, senha);
        console.log("Service - Insert", novoUsuario);
        return novoUsuario;
    }

    async atualizarLivro(usuarioData: any): Promise<Usuario> {
        const { id, nome, email, senha } = usuarioData;
        if (!id || !nome || !email || !senha) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const usuarioAtualizado = await this.UsuarioRepository.updateUsuario(id, nome, email, senha);
        console.log("Service - Update", usuarioAtualizado);
        return usuarioAtualizado;
    }

    async deletarLivro(usuarioData: any): Promise<Usuario> {
        const { id, nome, email, senha } = usuarioData;
        if (!id || !nome || !email || !senha) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const usuarioDeletado = await this.UsuarioRepository.deleteUsuario(id, nome, email, senha);
        console.log("Service - Delete", usuarioDeletado);
        return usuarioDeletado;
    }

    async filtrarLivro(id: any, isbn: any): Promise<Usuario[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const livros: Usuario[]|undefined = await this.UsuarioRepository.filterUsuarioId(idNumber);  //você sempre recebe uma lista do mysql2 (Usuario[])
            if(livros?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", livros);
            return livros;
        }
        
        else if(isbn){
            const livros: Usuario[]|undefined = await this.UsuarioRepository.filterUsuarioIsbn(isbn);
            console.log("Service - Filtrar", livros);
            return livros;
        }

        return undefined;

    }
    
    async listarTodosLivros(): Promise<Usuario[]> {
        const livros = await this.UsuarioRepository.filterAllUsuarios();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}