export class Estoque{
    id: number;
    ModalidadeId: number;
    quantidade: number;
    precoVenda: number;

    constructor(ModalidadeId:number, quantidade:number, precoVenda: number){
        this.id = this.geraId();
        this.ModalidadeId = ModalidadeId;
        this.quantidade = quantidade;
        this.precoVenda = precoVenda;
    }

    private geraId():number{
        return Date.now();
    }

}