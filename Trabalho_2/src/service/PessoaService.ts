import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService{

    pessoaRepository: PessoaRepository = new PessoaRepository();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { idPessoa, senha} = pessoaData;
        
        const pessoa = new PessoaEntity(idPessoa, senha)

        const novopessoa =  await this.pessoaRepository.insertPessoa(pessoa);
        console.log("Service - Insert ", novopessoa);
        return novopessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, idPessoa, senha } = pessoaData;

        const pessoa = new PessoaEntity(id, idPessoa, senha)

        await this.pessoaRepository.updatePessoa(pessoa);
        console.log("Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, idPessoa, senha } = pessoaData;

        const pessoa = new PessoaEntity(id, idPessoa, senha)

        await this.pessoaRepository.deletePessoa(pessoa);
        console.log("Service - Delete ", pessoa);
        return pessoa;
    }

    async filtrarPessoaById(pessoaData: any): Promise<PessoaEntity> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.filterPessoaById(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async filtrarPessoaByName(pessoaData: any): Promise<PessoaEntity[]> {
        const name:string = pessoaData;

        const pessoas =  await this.pessoaRepository.filterPessoaByName(name);
        console.log("Service - Filtrar", pessoas);
        return pessoas;
    }

    async listarTodosPessoas(): Promise<PessoaEntity[]> {
        const pessoas =  await this.pessoaRepository.filterAllPessoa();
        console.log("Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}