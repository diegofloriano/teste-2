import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class emprestimoService{

    emprestimoRepository: EmprestimoRepository = new EmprestimoRepository();

    async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { name, price, expirationDate } = emprestimoData;
        
        const emprestimo = new EmprestimoEntity(undefined, name, price, expirationDate)

        const novoemprestimo =  await this.emprestimoRepository.insertEmprestimo(emprestimo);
        console.log("Service - Insert ", novoemprestimo);
        return novoemprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, name, price, expirationDate } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, name, price, expirationDate)

        await this.emprestimoRepository.updateEmprestimo(emprestimo);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, name, price, expirationDate } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, name, price, expirationDate)

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

}