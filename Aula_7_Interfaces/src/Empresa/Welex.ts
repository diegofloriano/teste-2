import {Funcionario} from "./Funcionario"

export class Welex implements Funcionario{
    name: string;
    
    constructor(name:string){
        this.name = name;
}

    Gerente(): boolean {
        return false;
    }
    Desenvolvedor(): boolean {
        return true;
       
    }

}