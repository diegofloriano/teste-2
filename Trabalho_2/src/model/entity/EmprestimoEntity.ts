import { stringParaData, verificaFormatoData } from "../../util/DataUtil";
export class EmprestimoEntity{
    id: number;
    livroId: string;
    usuarioId: string;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?:string, usuarioId?: string, dataEmprestimo?: string, dataDevolucao?:string){
        this.validatesInformation(livroId, usuarioId, dataEmprestimo, dataDevolucao);
        this.id = id || 0;
        this.livroId = livroId || '';
        this.usuarioId = usuarioId || '';
        this.dataEmprestimo = stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }

    private validatesInformation(livroId:any, usuarioId:any, dataEmprestimo:any, dataDevolucao:any){
        let error ='';
        if (typeof livroId !== 'string' || typeof usuarioId !== 'number' || typeof dataEmprestimo !== 'string' || typeof dataDevolucao !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(!verificaFormatoData(dataEmprestimo)){
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}