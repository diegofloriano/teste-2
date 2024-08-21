import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class categoriaService{

    categoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { idPessoa, senha} = categoriaData;
        
        const categoria = new CategoriaEntity(idPessoa, senha)

        const novocategoria =  await this.categoriaRepository.insertCategoria(categoria);
        console.log("Service - Insert ", novocategoria);
        return novocategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, idPessoa, senha } = categoriaData;

        const categoria = new CategoriaEntity(id, idPessoa, senha)

        await this.categoriaRepository.updateCategoria(categoria);
        console.log("Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, idPessoa, senha } = categoriaData;

        const categoria = new CategoriaEntity(id, idPessoa, senha)

        await this.categoriaRepository.deleteCategoria(categoria);
        console.log("Service - Delete ", categoria);
        return categoria;
    }

    async filtrarCategoriaById(categoriaData: any): Promise<CategoriaEntity> {
        const idNumber = parseInt(categoriaData, 10);

        const categoria =  await this.categoriaRepository.filterCategoriaById(idNumber);
        console.log("Service - Filtrar", categoria);
        return categoria;
    }

    async filtrarCategoriaByName(categoriaData: any): Promise<CategoriaEntity[]> {
        const name:string = categoriaData;

        const categorias =  await this.categoriaRepository.filterCategoriaByName(name);
        console.log("Service - Filtrar", categorias);
        return categorias;
    }

    async listarTodosCategorias(): Promise<CategoriaEntity[]> {
        const categorias =  await this.categoriaRepository.filterAllCategoria();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }

}