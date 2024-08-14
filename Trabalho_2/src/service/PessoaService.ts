import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Pessoa } from "../model/entity/Pessoa";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {

    PessoaRepository: PessoaRepository = new PessoaRepository();

    async cadastrarPessoa(pessoaData: any): Promise<Pessoa> {
        const { nome, email } = pessoaData;
        if (!nome || !email) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarPessoa(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoPessoa = await this.PessoaRepository.insertPessoa(nome, email);
        console.log("Service - Insert", novoPessoa);
        return novoPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;
        if (!id || !nome || !email) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarPessoa(id, undefined);

        const PessoaAtualizado = await this.PessoaRepository.updatePessoa(id, nome, email);
        console.log("Service - Update", PessoaAtualizado);
        return PessoaAtualizado;
    }

    async deletarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;
        if (!id || !nome || !email) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarPessoa(id, undefined);

        const PessoaDeletado = await this.PessoaRepository.deletePessoa(id, nome, email);
        console.log("Service - Delete", PessoaDeletado);
        return PessoaDeletado;
    }

    async filtrarPessoa(id: any, isbn: any): Promise<Pessoa[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const pessoas: Pessoa[]|undefined = await this.PessoaRepository.filterPessoaId(idNumber);  //você sempre recebe uma lista do mysql2 (Pessoa[])
            if(pessoas?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", pessoas);
            return pessoas;
        }
        
        else if(isbn){
            const pessoas: Pessoa[]|undefined = await this.PessoaRepository.filterPessoaIsbn(isbn);
            console.log("Service - Filtrar", pessoas);
            return pessoas;
        }

        return undefined;

    }
    
    async listarTodosPessoas(): Promise<Pessoa[]> {
        const pessoas = await this.PessoaRepository.filterAllPessoas();
        console.log("Service - Listar Todos", pessoas);
        return pessoas;
    }
}