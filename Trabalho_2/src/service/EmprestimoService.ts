import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class EmprestimoService {

    EmprestimoRepository: EmprestimoRepository = new EmprestimoRepository();

    async cadastraremprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { emprestimoId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        if (!emprestimoId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtraremprestimo(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoemprestimo = await this.EmprestimoRepository.insertEmprestimo(emprestimoId, usuarioId, dataEmprestimo, dataDevolucao);
        console.log("Service - Insert", novoemprestimo);
        return novoemprestimo;
    }

    async atualizaremprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, emprestimoId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        if (!id || !emprestimoId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
            throw new Error("Informações incompletas");
        }
        await this.filtraremprestimo(id, undefined);

        const emprestimoAtualizado = await this.EmprestimoRepository.updateEmprestimo(id, emprestimoId, usuarioId, dataEmprestimo, dataDevolucao);
        console.log("Service - Update", emprestimoAtualizado);
        return emprestimoAtualizado;
    }

    async deletaremprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, emprestimoId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        if (!id || !emprestimoId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
            throw new Error("Informações incompletas");
        }
        await this.filtraremprestimo(id, undefined);

        const emprestimoDeletado = await this.EmprestimoRepository.deleteEmprestimo(id, emprestimoId, usuarioId, dataEmprestimo, dataDevolucao);
        console.log("Service - Delete", emprestimoDeletado);
        return emprestimoDeletado;
    }

    async filtraremprestimo(id: any, isbn: any): Promise<Emprestimo[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const emprestimos: Emprestimo[]|undefined = await this.EmprestimoRepository.filterEmprestimoId(idNumber);  //você sempre recebe uma lista do mysql2 (Emprestimo[])
            if(emprestimos?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", emprestimos);
            return emprestimos;
        }
        
        else if(isbn){
            const emprestimos: Emprestimo[]|undefined = await this.EmprestimoRepository.filterEmprestimoIsbn(isbn);
            console.log("Service - Filtrar", emprestimos);
            return emprestimos;
        }

        return undefined;

    }
    
    async listarTodosemprestimos(): Promise<Emprestimo[]> {
        const emprestimos = await this.EmprestimoRepository.filterAllEmprestimos();
        console.log("Service - Listar Todos", emprestimos);
        return emprestimos;
    }
}