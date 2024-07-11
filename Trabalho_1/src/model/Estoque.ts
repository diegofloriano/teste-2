export class Estoque{
    id: number;
    ModalidadeId: number;
    quantidade: number;
    precoVenda: number;

    constructor(id: number, ModalidadeId:number, quantidade:number, precoVenda: number){
        this.id = id;
        this.ModalidadeId = ModalidadeId;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }
}