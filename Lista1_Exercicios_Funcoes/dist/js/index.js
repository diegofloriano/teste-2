"use strict";
//1- Crie uma função que receba uma lista de números como parâmetro e retorne o 
//maior número da lista. 
function encontrarMaiorNumero(lista) {
    if (lista.length === 0) {
        throw new Error("A lista está vazia");
    }
    let maior = lista[0];
    for (let i = 1; i < lista.length; i++) {
        if (lista[i] > maior) {
            maior = lista[i];
        }
    }
    return maior;
}
// Exemplo:
const maiorNumero = encontrarMaiorNumero([10, 5, 20, 8, 15]);
console.log("O maior número é:", maiorNumero);
//2- Desenvolva uma função que receba um número como parâmetro e verifique se
//ele é par ou ímpar. Retorne true se for par e false se for ímpar.
function verificarParOuImpar(numero) {
    return numero % 2 === 0;
}
// Exemplo:
console.log(20 + " é par? " + verificarParOuImpar(20)); // true
console.log(5 + " é par? " + verificarParOuImpar(5)); // false
//3- Implemente uma função que calcule a média aritmética de um array de números
//e retorne o resultado. Utilize essa função para calcular a média de diferentes
//conjuntos de números.
function calcularMedia(numeros) {
    if (numeros.length === 0) {
        throw new Error("A lista está vazia");
    }
    const soma = numeros.reduce((acc, num) => acc + num, 0);
    const media = soma / numeros.length;
    return media;
}
// Exemplo:
try {
    const media1 = calcularMedia([10, 15, 20, 25, 30]);
    console.log("A média do conjunto 1 é:", media1);
    const media2 = calcularMedia([5, 7, 9]);
    console.log("A média do conjunto 2 é:", media2);
    const media3 = calcularMedia([30, 20, 10]);
    console.log("A média do conjunto 3 é:", media3);
}
catch (error) {
    console.log("mensagem de erro");
}
//4- Crie uma função que receba uma string como parâmetro e retorne a mesma
//string com todas as letras em caixa alta. Utilize essa função para converter
//diferentes strings.
function converterParaCaixaAlta(texto) {
    return texto.toUpperCase();
}
// Exemplo:
const string1 = "hello world!";
const string2 = "O incrivel hulk";
console.log("String 1 em caixa alta:", converterParaCaixaAlta(string1));
console.log("String 2 em caixa alta:", converterParaCaixaAlta(string2));
//5- Desenvolva uma função que determine se um número é primo ou não. Retorne
//true se for primo e false se não for.
function verificarPrimo(numero) {
    // 1 não é primo
    if (numero <= 1) {
        return false;
    }
    // Verificando divisibilidade até a raiz quadrada do número
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}
//Exemplo:
console.log(7 + " é primo? " + verificarPrimo(7)); // true
console.log(10 + " é primo? " + verificarPrimo(10)); // false
//6- Implemente uma função que inverta a ordem dos elementos em um array.
//Utilize essa função para inverter a ordem de diferentes conjuntos de elementos.
function inverterArray(array) {
    const arrayInvertido = [];
    for (let i = array.length - 1; i >= 0; i--) {
        arrayInvertido.push(array[i]);
    }
    return arrayInvertido;
}
// Exemplo:
console.log("Conjunto 1 invertido:", inverterArray([10, 15, 20, 25, 30]));
console.log("Conjunto 2 invertido:", inverterArray([5, 7, 9]));
//7- Crie uma função que receba um valor e uma porcentagem como parâmetros. A
//função deve retornar o valor acrescido da porcentagem indicada.
function calcularValorComPorcentagem(valor, porcentagem) {
    const valorAcrescido = valor + (valor * (porcentagem / 100));
    return valorAcrescido;
}
// Exemplo:
const valorOriginal = 100;
const porcentagemAcrescimo = 20;
const novoValor = calcularValorComPorcentagem(valorOriginal, porcentagemAcrescimo);
console.log("O valor acrescido da porcentagem é:", novoValor);
//8- Crie uma função que receba uma string e retorne a mesma string, mas com as
//palavras em ordem reversa. 
function inverterOrdemDasPalavras(frase) {
    const palavras = frase.split(" "); // Divide a string em um array de palavras
    const palavrasInvertidas = palavras.reverse(); // Inverte a ordem do array de palavras
    return palavrasInvertidas.join(" "); // Junta as palavras do array em uma única string
}
// Exemplo:
const fraseOriginal = "Você quer brincar na neve?";
const fraseInvertida = inverterOrdemDasPalavras(fraseOriginal);
console.log("Frase com as palavras em ordem reversa:", fraseInvertida);
//9- Implemente uma função que retorne a soma de todos os números pares em um
//array
function somaDosPares(numeros) {
    let soma = 0;
    for (let numero of numeros) {
        if (numero % 2 === 0) { // Verifica se o número é par
            soma += numero;
        }
    }
    return soma;
}
// Exemplo:
const resultado = somaDosPares([10, 5, 20, 8, 15]);
console.log("A soma dos números pares é:", resultado);
//10- Crie uma função que calcule o fatorial de um número. Utilize essa função para
//calcular o fatorial de diferentes números.
function calcularFatorial(numero) {
    if (numero < 0) {
        throw new Error("O fatorial não está definido para números negativos");
    }
    if (numero === 0 || numero === 1) {
        return 1;
    }
    let fatorial = 1;
    for (let i = 2; i <= numero; i++) {
        fatorial *= i;
    }
    return fatorial;
}
// Exemplo:
console.log("O fatorial de", 8, "é", calcularFatorial(8));
console.log("O fatorial de", 7, "é", calcularFatorial(7));
