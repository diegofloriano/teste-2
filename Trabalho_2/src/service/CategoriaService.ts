import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Categoria } from "../model/entity/Categoria";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService {

    CategoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarLivro(livroData: any): Promise<Categoria> {
        const { nome } = livroData;
        if (!nome) {
            throw new Error("Informações incompletas");
        }

        const existe = await this.filtrarLivro(undefined, isbn);
        console.log(existe?.length); //retorna o tamanho da lista
        const quantidadeCadastrada: number = existe?.length || 0; //se retornar algum undefined(null) quantidadeCadastrada recebe 0
        if(quantidadeCadastrada > 0 ){ //se tiver alguem na lista, ou seja, maior que 0
            throw new Error("ISBN já existe!"); //erro
        }

        const novoLivro = await this.CategoriaRepository.insertCategoria(nome);
        console.log("Service - Insert", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Categoria> {
        const { id, nome } = livroData;
        if (!id || !nome) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroAtualizado = await this.CategoriaRepository.updateCategoria(id, nome);
        console.log("Service - Update", livroAtualizado);
        return livroAtualizado;
    }

    async deletarLivro(livroData: any): Promise<Categoria> {
        const { id, nome } = livroData;
        if (!id || !nome) {
            throw new Error("Informações incompletas");
        }
        await this.filtrarLivro(id, undefined);

        const livroDeletado = await this.CategoriaRepository.deleteCategoria(id, nome);
        console.log("Service - Delete", livroDeletado);
        return livroDeletado;
    }

    async filtrarLivro(id: any, isbn: any): Promise<Categoria[]|undefined> {
        if(id){
            const idNumber : number = parseInt(id)
            const livros: Categoria[]|undefined = await this.CategoriaRepository.filterCategoriaId(idNumber);  //você sempre recebe uma lista do mysql2 (Categoria[])
            if(livros?.length ===0){
                throw new Error("Id não encontrado");
            }
            console.log("Service - Filtrar", livros);
            return livros;
        }
        
        else if(isbn){
            const livros: Categoria[]|undefined = await this.CategoriaRepository.filterCategoriaIsbn(isbn);
            console.log("Service - Filtrar", livros);
            return livros;
        }

        return undefined;

    }
    
    async listarTodosLivros(): Promise<Categoria[]> {
        const livros = await this.CategoriaRepository.filterAllCategorias();
        console.log("Service - Listar Todos", livros);
        return livros;
    }
}