import {Funcionario} from "./Funcionario"
import {Vitu} from "./Vitu"
import {Welex} from "./Welex"


function imprimeAnimal(funcionario: Funcionario){
    console.log(`O Funcionario ${funcionario.name} eh Gerente :${funcionario.Gerente()}`);
    console.log(`O Funcionario ${funcionario.name} eh Desenvolvedor :${funcionario.Desenvolvedor()}`);
}