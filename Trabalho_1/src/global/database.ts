import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { Venda } from "../model/Venda";

const modalidadeList : Modalidade[]= [];
const estoqueList : Estoque[]= [];
const vendaList : Venda[]= [];

export function getModalidadeList(){
    return modalidadeList;
}

export function getEstoqueList(){
    return estoqueList;
}

export function getVendaList(){
    return vendaList;
}