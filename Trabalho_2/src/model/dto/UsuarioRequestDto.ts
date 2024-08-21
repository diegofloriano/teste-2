export class UsuarioRequestDto {
    senha: string;
    idPessoa: number;
   
    constructor(senha?: string, idPessoa?:number){
        this.senha = senha || '';
        this.idPessoa = idPessoa || 0;
    }
}