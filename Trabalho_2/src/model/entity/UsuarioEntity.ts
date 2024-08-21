export class UsuarioEntity{
    id: number;
    senha: string;
    idPessoa: number;
   

    constructor(id?: number, senha?: string, idPessoa?:number){
        this.id = id || 0;
        this.senha = senha || '';
        this.idPessoa = idPessoa || 0;
    }

}
