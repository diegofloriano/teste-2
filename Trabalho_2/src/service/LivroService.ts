import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Livro } from "../model/entity/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {

    LivroRepository: LivroRepository = new LivroRepository();

    async cadastrarLivro(livroData: any): Promise<Livro> {
        const { titulo, autor, categoriaId } = livroData;
        if (!titulo || !autor || !categoriaId) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarLivro(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoLivro = await this.LivroRepository.insertLivro(titulo, autor, categoriaId);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId } = livroData;
        if (!id || !titulo || !autor || !categoriaId) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroAtualizado = await this.LivroRepository.updateLivro(id, titulo, autor, categoriaId);
        console.log("Service - Update", livroAtualizado);
        return livroAtualizado;
    }

    async deletarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId } = livroData;
        if (!id || !titulo || !autor || !categoriaId) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroDeletado = await this.LivroRepository.deleteLivro(id, titulo, autor, categoriaId);
        console.log("Service - Delete", livroDeletado);
        return livroDeletado;
    }

    async filtrarLivro(id: any, isbn: any): Promise<Livro[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const livros: Livro[]|undefined = await this.LivroRepository.filterLivroId(idNumber);  //você sempre recebe uma lista do mysql2 (Livro[])
            if(livros?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", livros);
            return livros;
        }
        
        else if(isbn){
            const livros: Livro[]|undefined = await this.LivroRepository.filterLivroIsbn(isbn);
            console.log("Service - Filtrar", livros);
            return livros;
        }

        return undefined;

    }
    
    async listarTodosLivros(): Promise<Livro[]> {
        const livros = await this.LivroRepository.filterAllLivros();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}