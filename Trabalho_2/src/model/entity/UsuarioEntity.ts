export class UsuarioEntity{
    id: number;
    senha: string;
    idPessoa: number;
   

    constructor(id?: number, senha?: string, idPessoa?:number){
        this.validatesInformation(senha, idPessoa);
        this.id = id || 0;
        this.senha = senha || '';
        this.idPessoa = idPessoa || 0;
    }

    private validatesInformation(senha:any, idPessoa:any){
        let error ='';
        if (typeof senha !== 'string' || typeof idPessoa !== 'number') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if(error != ''){
            throw new Error(error);
        }
    }
}
