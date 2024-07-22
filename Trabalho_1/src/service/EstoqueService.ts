import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProductRepository } from "../repository/ModalidadeRepository";
import { ProductService } from "./ModalidadeService";

export class EstoqueService{

    productRepository: ProductRepository = new ProductRepository();
    productService: ProductService = new ProductService();
    estoqueRepository: EstoqueRepository = new EstoqueRepository();

    cadastrarEstoque(estoqueData: any): Estoque {
        const {ModalidadeId, quantidade, precoVenda } = estoqueData;
        if(!ModalidadeId || !quantidade || !precoVenda){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarEstoque(undefined);
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

        const novoEstoque = new Estoque(ModalidadeId, quantidade, precoVenda);
        this.estoqueRepository.insereEstoque(novoEstoque);
        return novoEstoque;
        
    }

    consultarEstoque(id: any): Estoque|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.estoqueRepository.filtraEstoquePorId(idNumber);
    }

    consultarId(ModalidadeId: number): Modalidade|undefined{
        return this.productRepository.filtraProdutoPorId(ModalidadeId);
    }
    
    getEstoque(): Estoque[]{
       return this.estoqueRepository.filtraTodosEstoques().sort((a,b) => a.id - b.id);;
    }

    deletarEstoque(estoqueData: any): Estoque{
        const {id, quantidade} = estoqueData;
        if (!id || !quantidade){
            if(quantidade <= 0){
                throw new Error("Informacoes incompletas");
            }
        }
        let estoqueEncontrado = this.consultarEstoque(id) ;
        
        if (!estoqueEncontrado){
            throw new Error("Estoque nao cadastrado !!!") ;
        }

        if (quantidade <= 0) {
            throw new Error("Quantidade inválida para Exclusão");
        }

        if (quantidade > estoqueEncontrado.quantidade) {
            throw new Error("Estoque Insuficiente!");
        }

        estoqueEncontrado.ModalidadeId;
        estoqueEncontrado.quantidade -= quantidade ;
        estoqueEncontrado.precoVenda;       
        
        this.estoqueRepository.deletaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
        }

    atualizarEstoque(estoqueData: any): Estoque{
        const {id, quantidade} = estoqueData;
        if (!id || !quantidade){
            if(quantidade <= 0){
                throw new Error("Informacoes incompletas");
            }
        }
        
        let estoqueEncontrado = this.consultarEstoque(id) ;
        if (!estoqueEncontrado){
            throw new Error("Estoque nao cadastrado !!!") ;
        }
        if (quantidade <= 0) {
            throw new Error("Quantidade inválida para soma");
        }
        estoqueEncontrado.ModalidadeId;
        estoqueEncontrado.quantidade += quantidade ;
        estoqueEncontrado.precoVenda;

        this.estoqueRepository.atualizaEstoque(estoqueEncontrado);
        return estoqueEncontrado;
        }

        deletarQuantidade(id: number, quantidade: number){
            let estoqueEncontrado = this.consultarEstoque(id) ;
            if (!estoqueEncontrado){
                throw new Error("Estoque nao cadastrado !!!") ;
            } 
            if (quantidade <= 0) {
                throw new Error("Quantidade inválida para Venda");
            }
            if (quantidade > estoqueEncontrado.quantidade) {
                throw new Error("Estoque Insuficiente!");
            }
            estoqueEncontrado.quantidade -= quantidade;
            this.estoqueRepository.deletaEstoque(estoqueEncontrado);
        }

        consultarPreco(id: number): number {
            const estoque = this.consultarEstoque(id);
            if (estoque) {
                return estoque.precoVenda;
            }
            throw new Error("Estoque não encontrado! e");
        }

        consultarNome(id: number): string {
            const estoque = this.consultarEstoque(id);
            if (estoque) {
                const busca = estoque.ModalidadeId;
                const nome = this.productService.consultarNome(busca);
                return nome;
            }
            throw new Error("Estoque não encontrado! e n");
        }

}

