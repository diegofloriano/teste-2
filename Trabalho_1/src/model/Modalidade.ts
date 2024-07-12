export class Modalidade{
    id: number;
    nome: string;
    vegano: boolean;

    constructor(nome:string, vegano: boolean, id: number){
        this.id = id;
        this.nome = nome;
        this.vegano = vegano;
    }

}
