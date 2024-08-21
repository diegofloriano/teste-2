export class EmprestimoDto {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: string;
    dataDevolução: string;


    constructor(id?: any, livroId?: any, usuarioId?: any, dataEmprestimo?: any, dataDevolução?: any) {
        this.id = id;
        this.livroId = livroId;
        this.usuarioId = usuarioId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolução = dataDevolução;
    }
}