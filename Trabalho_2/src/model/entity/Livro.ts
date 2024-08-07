export class Livro{
    id: number;
    titulo: string;
    autor: string;
    categoriaid: string;
    




    constructor(id?: number, titulo?:string, autor?: string, categoriaid?: string ){
        this.id = id || 0;
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.categoriaid = categoriaid || '';

    }

}
