export class ItemVenda{
    EstoqueId: number;
    quantidade: number;
    nome: string;
    

    constructor(EstoqueId:number, quantidade: number, nome: string){
        this.EstoqueId = EstoqueId;
        this.quantidade = quantidade;
        this.nome = nome;
    }
}

export class Venda{
    id: number;
    cpf: number;
    total: number;
    itens: ItemVenda[];


    constructor(cpf: number, total: number, itens: ItemVenda[]){
        this.id = this.geraId();
        this.cpf = cpf;
        this.total = total;
        this.itens = itens;
    }

    private geraId():number{
        return Date.now();
    }

    
}