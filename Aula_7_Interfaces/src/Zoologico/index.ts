import {Animal} from "./Animal"
import {Leao} from "./Ave"
import {Pato} from "./Mamifero"


function imprimeAnimal(animal: Animal){
    console.log(`O animal ${animal.name} eh mamifero :${animal.mamifero()}`);
    console.log(`O animal ${animal.name} eh mamifero :${animal.ave()}`);
}

let ave = new Animal("Pato");
let mamifero = new Animal("Leao");



