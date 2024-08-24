import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";


export class EmprestimoService{
    usuarioRepository: UsuarioRepository = new UsuarioRepository();
    livroRepository: LivroRepository = new LivroRepository();
    emprestimoRepository: EmprestimoRepository = new EmprestimoRepository();

    async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolução } = emprestimoData;
        
        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolução);

        const pessoaExiste = await this.filtrarUsuarioById(usuarioId);
        console.log(pessoaExiste?.length); 
        if(pessoaExiste?.length === 0 ){ 
            throw new Error("Pessoa não existe!");
        }

        const livroExiste = await this.filtrarLivroById(livroId);
        console.log(livroExiste?.length); 
        if(livroExiste?.length === 0){
            throw new Error("Livro não existe");
        } 

        const novoEmprestimo =  await this.emprestimoRepository.insertEmprestimo(emprestimo);
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolução } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolução)

        await this.emprestimoRepository.updateEmprestimo(emprestimo);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolução } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolução)

        await this.emprestimoRepository.deleteEmprestimo(emprestimo);
        console.log("Service - Delete ", emprestimo);
        return emprestimo;
    }

    async filtrarEmprestimoById(emprestimoData: any): Promise<EmprestimoEntity> {
        const idNumber = parseInt(emprestimoData, 10);

        const emprestimo =  await this.emprestimoRepository.filterEmprestimoById(idNumber);
        console.log("Service - Filtrar", emprestimo);
        return emprestimo;
    }

    async filtrarEmprestimoByName(emprestimoData: any): Promise<EmprestimoEntity[]> {
        const name:string = emprestimoData;

        const emprestimos =  await this.emprestimoRepository.filterEmprestimoByName(name);
        console.log("Service - Filtrar", emprestimos);
        return emprestimos;
    }

    async listarTodosEmprestimos(): Promise<EmprestimoEntity[]> {
        const emprestimos =  await this.emprestimoRepository.filterAllEmprestimo();
        console.log("Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

    async filtrarUsuarioById(id: any): Promise<UsuarioEntity[]|undefined> {
        const idNumber : number = parseInt(id)
        const usuario: UsuarioEntity[]|undefined = await this.usuarioRepository.filterUsuarioById(idNumber);  
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async filtrarLivroById(id: any): Promise<LivroEntity[]|undefined> {
        const idNumber : number = parseInt(id)
        const livro: LivroEntity[]|undefined = await this.livroRepository.filterLivroById(idNumber);  
        console.log("Service - Filtrar", livro);
        return livro;
    }
}