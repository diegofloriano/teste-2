import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";

export class livroService{

    livroRepository: LivroRepository = new LivroRepository();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { idPessoa, senha} = livroData;
        
        const livro = new LivroEntity(idPessoa, senha)

        const novolivro =  await this.livroRepository.insertLivro(livro);
        console.log("Service - Insert ", novolivro);
        return novolivro;
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, idPessoa, senha } = livroData;

        const livro = new LivroEntity(id, idPessoa, senha)

        await this.livroRepository.updateLivro(livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, idPessoa, senha } = livroData;

        const livro = new LivroEntity(id, idPessoa, senha)

        await this.livroRepository.deleteLivro(livro);
        console.log("Service - Delete ", livro);
        return livro;
    }

    async filtrarLivroById(livroData: any): Promise<LivroEntity> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepository.filterLivroById(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async filtrarLivroByName(livroData: any): Promise<LivroEntity[]> {
        const name:string = livroData;

        const livros =  await this.livroRepository.filterLivroByName(name);
        console.log("Service - Filtrar", livros);
        return livros;
    }

    async listarTodosLivros(): Promise<LivroEntity[]> {
        const livros =  await this.livroRepository.filterAllLivro();
        console.log("Service - Filtrar Todos", livros);
        return livros;
    }

}