import { Estoque } from "../model/Estoque";
import { Venda } from "../model/Venda";
import { VendaRepository } from "../repository/VendaRepository";
import { ItemVenda } from "../model/Venda";
import { EstoqueService } from "./EstoqueService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProductRepository } from "../repository/ModalidadeRepository";
import { ProductService } from "./ModalidadeService";

export class VendaService{

    vendaRepository: VendaRepository = new VendaRepository();
    estoqueService: EstoqueService = new EstoqueService();
    estoqueRepository: EstoqueRepository = new EstoqueRepository();
    productService: ProductService = new ProductService();

    cadastrarVenda(vendaData: any): Venda {
        const {id, cpf, itens} = vendaData
        console.log("itens de venda: ", id, cpf,  itens)
        if(!id || !cpf || !itens){
            throw new Error("Informações incompletas");
        }
        let idExiste = this.consultarVenda(id);
        if(idExiste){
            throw new Error("ID já Existente!");
        }
        const itemVendaList: ItemVenda[] = [];
        let total = 0;
        for(const item of itens){
            const {quantidade, EstoqueId} = item;
            if(!quantidade|| !EstoqueId){
            throw new Error("Informações incompletas");
            }
            let idEncontrado = this.consultarId(EstoqueId) ;
            if (!idEncontrado){
                throw new Error("Id nao encontrado !!!") ;
            }
            this.estoqueService.deletarQuantidade(EstoqueId, quantidade)

            const itemVenda= new ItemVenda(EstoqueId, quantidade);
            itemVendaList.push(itemVenda);

            const preco = this.estoqueService.consultarPreco(EstoqueId);
            total += quantidade * preco;

            const nome = this.productService.consultarNome(EstoqueId)
        }

        const novaVenda = new Venda(id, cpf, total, itemVendaList);
        this.vendaRepository.insereVenda(novaVenda);
        return novaVenda;
    }

    consultarVenda(id: any, undefined?: undefined): Venda|undefined{
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
    getProducts(): Venda[]{
       return this.vendaRepository.filtraTodasVendas();
    }
}

