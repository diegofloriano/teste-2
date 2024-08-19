export class livroEntity{
    id: number;
    titulo: string;
    autor: string;
    categoriaId: string;
    




    constructor(id?: number, titulo?:string, autor?: string, categoriaId?: string ){
        this.id = id || 0;
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.categoriaId = categoriaId || '';

    }

}
