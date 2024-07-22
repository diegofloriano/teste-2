export class Modalidade{
    id: number;
    nome: string;
    vegano: boolean;

    constructor(nome:string, vegano: boolean){
        this.id = this.geraId();
        this.nome = nome;
        this.vegano = vegano;
    }

    private geraId():number{
        return Date.now();
    }
}
