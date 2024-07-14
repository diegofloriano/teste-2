export class ItemVenda{
    EstoqueId: number;
    quantidade: number;
    

    constructor(EstoqueId:number, quantidade: number){
        this.EstoqueId = EstoqueId;
        this.quantidade = quantidade;
    }
}

export class Venda{
    id: number;
    cpf: number;
    total: number;
    itens: ItemVenda[];


    constructor(id:number, cpf: number, total: number, itens: ItemVenda[]){
        this.id = id;
        this.cpf = cpf;
        this.total = total;
        this.itens = itens;
    }

    
}