import {Funcionario} from "./Funcionario"

export class Vitu implements Funcionario{
    name: string;

    constructor(name:string){
        this.name = name;
    }
    Gerente(): boolean {
        return true;

    }
    Desenvolvedor(): boolean {
        return false;

    }

}