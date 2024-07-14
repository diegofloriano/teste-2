import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProductRepository } from "../repository/ModalidadeRepository";

export class EstoqueService{

    productRepository: ProductRepository = new ProductRepository();

    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarEstoque(estoqueData: any): Estoque {
        const { id, ModalidadeId, quantidade, precoVenda } = estoqueData;
        if(!id || !ModalidadeId || !quantidade || !precoVenda){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarEstoque(id);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        if(quantidade < 0){
            throw new Error("Quantidade não pode ser negativa");
        }

        let idEncontrado = this.consultarId(ModalidadeId) ;
        if (!idEncontrado){
            throw new Error("Id nao encontrado !!!") ;
        }

        const novoEstoque = new Estoque(id, ModalidadeId, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
        
    }

    consultarEstoque(id: any, undefined?: undefined): Estoque|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.estoqueRepository.filtraEstoquePorId(idNumber);
    }

    consultarId(ModalidadeId: number): Modalidade|undefined{
        return this.productRepository.filtraProdutoPorId(ModalidadeId);
    }
    
    getProducts(): Estoque[]{
       return this.estoqueRepository.filtraTodosEstoques();
    }

    deletarEstoque(estoqueData: any): Estoque{
        const {id, quantidade, ModalidadeId, precoVenda} = estoqueData;
        if (!id || !quantidade ||!ModalidadeId || !precoVenda){
            if(quantidade < 0){
                throw new Error("Informacoes incompletas");
            }
        }
        let estoqueEncontrado = this.consultarEstoque(id, undefined ) ;
        if (!estoqueEncontrado){
            throw new Error("Estoque nao cadastrado !!!") ;
        }
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para exclusão");
        }
        estoqueEncontrado.ModalidadeId = ModalidadeId ;
        estoqueEncontrado.quantidade -= quantidade ;
        estoqueEncontrado.precoVenda = precoVenda ;
        this.estoqueRepository.deletaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
        }

    atualizarEstoque(estoqueData: any): Estoque{
        const {id, quantidade, ModalidadeId, precoVenda} = estoqueData;
        if (!id || !quantidade ||!ModalidadeId || !precoVenda){
            if(quantidade < 0){
                throw new Error("Informacoes incompletas");
            }
        }
        
        let estoqueEncontrado = this.consultarEstoque(id, undefined ) ;
        if (!estoqueEncontrado){
            throw new Error("Estoque nao cadastrado !!!") ;
        }
        if (quantidade <= 0 || quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Quantidade inválida para soma");
        }
        estoqueEncontrado.ModalidadeId = ModalidadeId ;
        estoqueEncontrado.quantidade += quantidade ;
        estoqueEncontrado.precoVenda = precoVenda ;
        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
        }
        
}

