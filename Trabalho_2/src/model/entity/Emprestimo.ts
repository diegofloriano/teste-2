export class Emprestimo{
    id: number;
    livroid: string;
    usuarioid: string;
    dataEmprestimo: Date;
    dataDevolução: Date;




    constructor(id?: number, livroid?:string, usuarioid?: string, dataEmprestimo?: Date, dataDevolução?:Date){
        this.id = id || 0;
        this.livroid = livroid || '';
        this.usuarioid = usuarioid || '';
        this.dataEmprestimo = dataEmprestimo || Date;
        this.dataDevolução = dataDevolução || Date;
    }

}
