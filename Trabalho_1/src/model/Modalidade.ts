export class Modalidade{
    id: number;
    nome: string;
    vegano: boolean;
    preco: number;

    constructor(nome:string, vegano: boolean, id: number, preco: number){
        this.id = id;
        this.nome = nome;
        this.vegano = vegano;
        this.preco = preco;
    }

}
