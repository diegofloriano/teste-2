import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService{

    categoriaRepository: CategoriaRepository = new CategoriaRepository();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { nome } = categoriaData;
        
        const categoria = new CategoriaEntity(undefined, nome)

        const novaCategoria =  await this.categoriaRepository.insertCategoria(categoria);
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome } = categoriaData;

        const categoria = new CategoriaEntity(id, nome)

        await this.categoriaRepository.updateCategoria(categoria);
        console.log("Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome } = categoriaData;

        const categoria = new CategoriaEntity(id, nome)

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