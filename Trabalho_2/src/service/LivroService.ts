import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class LivroService{
    categoriaRepository: CategoriaRepository = new CategoriaRepository();
    livroRepository: LivroRepository = new LivroRepository();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { titulo, autor, categoriaId} = livroData;
        
        const livro = new LivroEntity(undefined, titulo, autor, categoriaId)
        
        const existe = await this.filtrarCategoriaById(categoriaId);
       
        if(!existe ){ 
            throw new Error("Categoria não existe!"); 
        }

        
        const novoLivro =  await this.livroRepository.insertLivro(livro);
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId)

        await this.livroRepository.updateLivro(livro);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new LivroEntity(id, titulo, autor, categoriaId)

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

    async filtrarCategoriaById(CategoriaData: any): Promise<CategoriaEntity> {
        const idNumber = parseInt(CategoriaData, 10);

        const Categoria =  await this.categoriaRepository.filterCategoriaById(idNumber);
        console.log("Service - Filtrar", Categoria);
        return Categoria;
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