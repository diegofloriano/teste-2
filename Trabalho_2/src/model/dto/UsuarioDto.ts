export class UsuarioDto{
    id: number;
    senha: string;
    idPessoa: number;

    constructor(id?: any, senha?: any, idPessoa?:any){
        this.id = id;
        this.senha = senha;
        this.idPessoa = idPessoa;
    }
}