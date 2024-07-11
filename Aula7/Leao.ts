import { Animal } from "./Animal";
export class Leao implements Animal{
    name: string;
    mamifero(): boolean {
        return true;
    }
    ave(): boolean {
        return false;
    }
    
}