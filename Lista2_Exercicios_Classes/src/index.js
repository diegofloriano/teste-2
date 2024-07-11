"use strict";
//1- 01 – Complete a classe Carro para que os atributos da mesma sejam acessados somente por métodos
//(Getters/ Setters) e tenha um método para calcular a idade do carro com base no ano atual. Crie uma
//instância de Carro
class Carro {
    constructor(nome, modelo, cor) {
        this.nome = nome;
        this.modelo = modelo;
        this.cor = cor;
    }
    get getNome() {
        return this.nome;
    }
    get getModelo() {
        return this.modelo;
    }
    get getCor() {
        return this.cor;
    }
    set setNome(novoNome) {
        this.nome = novoNome;
    }
    set setModelo(novoModelo) {
        this.modelo = novoModelo;
    }
    set setCor(novoCor) {
        this.cor = novoCor;
    }
    calcularIdade() {
        return 2024 - this.modelo;
    }
}
//Instancia da classe Carro
let carro1 = new Carro("camaro", 2009, "vermelho");
console.log('Nome: ' + carro1.getNome);
console.log('Modelo: ' + carro1.getModelo);
console.log('Cor: ' + carro1.getCor);
console.log('O calculo da idade do carro é: ' + carro1.calcularIdade());
//2 - Desenvolva uma classe Calculadora em TypeScript 
class Calculadora {
    constructor(valor1, valor2) {
        this.valor1 = valor1;
        this.valor2 = valor2;
    }
    get getValor1() {
        return this.valor1;
    }
    get getValor2() {
        return this.valor2;
    }
    set setValor1(novoValor1) {
        this.valor1 = novoValor1;
    }
    set setValor2(novoValor2) {
        this.valor2 = novoValor2;
    }
    Soma() {
        return this.valor1 + this.valor2;
    }
    Subtracao() {
        return this.valor1 - this.valor2;
    }
    Multiplicacao() {
        return this.valor1 * this.valor2;
    }
    Divisao() {
        if (this.valor2 === 0) {
            throw new Error('Não é possível dividir por zero');
        }
        return this.valor1 / this.valor2;
    }
    Porcentagem() {
        return (this.valor1 / this.valor2) * 100;
    }
}
let calculadora1 = new Calculadora(20, 10);
console.log('A soma é: ' + calculadora1.Soma());
console.log('A subtração é: ' + calculadora1.Subtracao());
console.log('A multiplicação é: ' + calculadora1.Multiplicacao());
console.log('A divisão é: ' + calculadora1.Divisao());
console.log('A porcentagem do primeiro valor em relacao ao segundo é: ' + calculadora1.Porcentagem() + '%');
//3 - Desenvolva uma classe Produto em TypeScript
class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }
    get getNome() {
        return this.nome;
    }
    get getPreco() {
        return this.preco;
    }
    get getEstoque() {
        return this.estoque;
    }
    set setNome(novoNome) {
        this.nome = novoNome;
    }
    set setPreco(novoPreco) {
        this.preco = novoPreco;
    }
    set setEstoque(novoEstoque) {
        this.estoque = novoEstoque;
    }
    calcularValorTotalEmEstoque() {
        return this.preco * this.estoque;
    }
    reporEstoque(quantidade) {
        if (quantidade < 0) {
            throw new Error("A quantidade de reposição deve ser positiva.");
        }
        this.estoque += quantidade;
    }
    vender(quantidade) {
        if (quantidade < 0) {
            throw new Error("A quantidade vendida deve ser positiva.");
        }
        if (quantidade > this.estoque) {
            throw new Error("Quantidade insuficiente em estoque.");
        }
        this.estoque -= quantidade;
    }
}
// Instancia da classe Produto
let produto1 = new Produto("biscoito", 20, 10);
console.log('Nome: ' + produto1.getNome);
console.log('Preco: R$' + produto1.getPreco);
console.log('Quantidade: ' + produto1.getEstoque);
console.log('O valor total em estoque é: R$' + produto1.calcularValorTotalEmEstoque());
produto1.reporEstoque(5);
console.log('Quantidade reposta: ' + produto1.getEstoque);
produto1.vender(3);
console.log('Quantidade após a venda: ' + produto1.getEstoque);
