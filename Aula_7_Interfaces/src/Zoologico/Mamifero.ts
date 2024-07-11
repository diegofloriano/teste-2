import {Animal} from "./Animal"

export class Pato implements Animal{
    name: string;
    
    constructor(name:string){
        this.name = name;
}

    mamifero(): boolean {
        return false;
    }
    ave(): boolean {
        return true;
       
    }

}