export class ItemVenda{
    EstoqueId: number;
    quantidade: number;
    preco: number;

    constructor(EstoqueId:number, quantidade: number, preco: number){
        this.EstoqueId = EstoqueId;
        this.quantidade = quantidade;
        this.preco = preco;
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