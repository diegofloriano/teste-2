import { ProductRepository } from "../repository/ModalidadeRepository";
import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProductService } from "../service/ModalidadeService";

export class EstoqueService{

    productRepository: ProductRepository = new ProductRepository();


    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarEstoque(estoqueData: any): Estoque {
        const { id, ModalidadeId, quantidade, precoVenda } = estoqueData;
        if(!id || !ModalidadeId || !quantidade || !precoVenda){
            throw new Error("Informações incompletas");
        }
        if(quantidade < 0){
            throw new Error("Quantidade não pode ser negativa");
        }
        let modalidadeEncontrada = this.productRepository.filtraProdutoPorId(ModalidadeId);
        if(!modalidadeEncontrada){
            throw new Error("Modalidade Invalida !") ;
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

    getProducts(): Estoque[]{
       return this.estoqueRepository.filtraTodosEstoques();
    }

    deletarEstoque(id: any){
        const product = this.consultarEstoque(id, undefined);
        if (!product){
            throw new Error("Produto nao encontrado") ;
        }
        
        this.estoqueRepository.deletaEstoque(product);
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
        estoqueEncontrado.ModalidadeId = ModalidadeId ;
        estoqueEncontrado.quantidade = quantidade ;
        estoqueEncontrado.precoVenda = precoVenda ;
        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
        }
        
}

