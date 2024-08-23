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
        
        const categoriaExiste = await this.filtrarCategoriaById(categoriaId);
        console.log(categoriaExiste?.length); 
        if(categoriaExiste?.length === 0){
            throw new Error("Categoria não existe");
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

    async filtrarLivroById(livroData: any): Promise<LivroEntity[]|undefined> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepository.filterLivroById(idNumber);
        console.log("Service - Filtrar", livro);
        return livro;
    }

    async filtrarLivroByName(livroData: any): Promise<LivroEntity[]|undefined> {
        const titulo:string = livroData;

        const livros: LivroEntity[]|undefined =  await this.livroRepository.filterLivroByName(titulo);
        console.log("Service - Filtrar", livros);
        return livros;
    }


    async listarTodosLivros(): Promise<LivroEntity[]> {
        const livros =  await this.livroRepository.filterAllLivro();
        console.log("Service - Filtrar Todos", livros);
        return livros;
    }

    async filtrarCategoriaById(id: any): Promise<CategoriaEntity[]|undefined> {
            const idNumber : number = parseInt(id)
            const categoria: CategoriaEntity[]|undefined = await this.categoriaRepository.filterCategoriaById(idNumber);  
            console.log("Service - Filtrar", categoria);
            return categoria;
    }
}