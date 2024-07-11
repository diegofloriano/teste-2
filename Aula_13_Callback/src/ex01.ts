//Exercício: Contagem Regressiva Automática
//1. Crie uma função que reverte uma sentença e utiliza uma função callback para devolver à função
//chamadora um texto específico. O texto deve ser "A INVERSÃO DA SENTENÇA RESULTOU
//EM:" concatenado com o resultado obtido, tudo em letras maiúsculas. A função chamadora será
//responsável por exibir o resultado no console.


function reverterString (s:string, callback:(param:string) => string): void{
    const op = s.split('').reverse().join('');
    const resultado = callback(op);
    console.log(resultado);
}

export function exibeFrase (frase:string):string {
    return ` A INVERSAO DA SENTENÇA RESULTOU EM: ${frase.toUpperCase()}`;
}