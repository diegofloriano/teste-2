import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { PessoaRepository } from "../repository/PessoaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class UsuarioService{

    pessoaRepository: PessoaRepository = new PessoaRepository();
    usuarioRepository: UsuarioRepository = new UsuarioRepository();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const {senha, idPessoa} = usuarioData;
        
        const usuario = new UsuarioEntity(undefined, senha, idPessoa)

        const existe = await this.filtrarPessoaById(idPessoa);
       
        if(!existe ){ 
            throw new Error("Pessoa não existe!");  
        }
        const novoUsuario =  await this.usuarioRepository.insertUsuario(usuario);
        console.log("Service - Insert ", novoUsuario);
        return novoUsuario;
        
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { senha, idPessoa } = usuarioData;

        const usuario = new UsuarioEntity(undefined, senha, idPessoa)

        await this.usuarioRepository.updateUsuario(usuario);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, senha, idPessoa } = usuarioData;

        const usuario = new UsuarioEntity(id, senha, idPessoa)

        await this.usuarioRepository.deleteUsuario(usuario);
        console.log("Service - Delete ", usuario);
        return usuario;
    }

    async filtrarUsuarioById(usuarioData: any): Promise<UsuarioEntity> {
        const idNumber = parseInt(usuarioData, 10);

        const usuario =  await this.usuarioRepository.filterUsuarioById(idNumber);
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async filtrarUsuarioByName(usuarioData: any): Promise<UsuarioEntity[]> {
        const name:string = usuarioData;

        const usuarios =  await this.usuarioRepository.filterUsuarioByName(name);
        console.log("Service - Filtrar", usuarios);
        return usuarios;
    }

    async filtrarPessoaById(CategoriaData: any): Promise<PessoaEntity> {
        const idNumber = parseInt(CategoriaData, 10);

        const Pessoa =  await this.pessoaRepository.filterPessoaById(idNumber);
        console.log("Service - Filtrar", Pessoa);
        return Pessoa;
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios =  await this.usuarioRepository.filterAllUsuario();
        console.log("Service - Filtrar Todos", usuarios);
        return usuarios;
    }

}