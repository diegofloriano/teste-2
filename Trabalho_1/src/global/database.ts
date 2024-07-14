import { Estoque } from "../model/Estoque";
import { Modalidade } from "../model/Modalidade";
import { ItemVenda, Venda } from "../model/Venda";

const modalidadeList : Modalidade[]= [];
const estoqueList : Estoque[]= [];
const vendaList : Venda[]= [];
const itemVendaList : ItemVenda[]= [];

export function getModalidadeList(){
    return modalidadeList;
}

export function getEstoqueList(){
    return estoqueList;
}

export function getVendaList(){
    return vendaList;
}

export function getItemVendaList(){
    return itemVendaList;
}