import { Estoque } from "../model/Estoque";
import { Venda } from "../model/Venda";
import { VendaRepository } from "../repository/VendaRepository";
import { ItemVenda } from "../model/Venda";
import { EstoqueService } from "./EstoqueService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProductService } from "./ModalidadeService";

export class VendaService{

    vendaRepository: VendaRepository = new VendaRepository();
    estoqueService: EstoqueService = new EstoqueService();
    estoqueRepository: EstoqueRepository = new EstoqueRepository();
    productService: ProductService = new ProductService();

    cadastrarVenda(vendaData: any): Venda {
        const {cpf, itens} = vendaData
        if(!cpf || !itens){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(undefined);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const itemVendaList: ItemVenda[] = [];
        let total = 0;
        for(const item of itens){
            const {quantidade, EstoqueId} = item;
            if(!quantidade|| !EstoqueId){
                throw new Error("Informacoes incompletas");
            }
            let idEncontrado = this.consultarId(EstoqueId) ;
            if (!idEncontrado){
                throw new Error("Id nao encontrado !!!") ;
            }
            this.estoqueService.deletarQuantidade(EstoqueId, quantidade);

            const nome = this.estoqueService.consultarNome(EstoqueId);

            const itemVenda= new ItemVenda(EstoqueId, quantidade, nome);
            itemVendaList.push(itemVenda);

            const preco = this.estoqueService.consultarPreco(EstoqueId);
            total += quantidade * preco;

        }

        const novaVenda = new Venda(cpf, total, itemVendaList);
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }

    consultarVenda(id: any): Venda|undefined{
        const idNumber: number = parseInt(id, 10);
        console.log(id)
        return this.vendaRepository.filtraVendaPorId(idNumber);
    }

    consultarId(EstoqueId: number): Estoque|undefined{
        return this.estoqueRepository.filtraEstoquePorId(EstoqueId);
    }

    consultarPreco(EstoqueId: number): Estoque|undefined{
        return this.estoqueRepository.filtraPrecoPorId(EstoqueId);
    }
    getVendas(): Venda[]{
       return this.vendaRepository.filtraTodasVendas().sort((a,b) => a.id - b.id);
    }
}

