import { Animal } from "./Animal";
import { Leao } from "./Leao";

function imprimeAnimal(animal: Animal){
    animal.ave();
}

let leao = new Leao();
imprimeAnimal(leao);
console.log(imprimeAnimal(leao));