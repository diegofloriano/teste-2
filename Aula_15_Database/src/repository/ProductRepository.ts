import {executarComandoSQL} from '../database/mysql';

export class ProductRepository{
    private imprimeResult(err: any, result: any){
        if(result){
            console.log("Dentro callback", result);
        }
    }

    createTable(){
        try{
            const result = executarComandoSQL("CREATE TABLE VENDAS.Product ("id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT null, price DECIMAL(10,2 NOT NULL") []this.imprimeResult")
        }catch(err){
            console.error('Erro ao executar a query')
        }
    }

    insertProduct(name: string, price: number){
        try{
            const result = executarComandoSQL("INSERT INTO vendas.Product(name, price) VALUES (?, ?)", [name, price]);
            console.log("Insert executado com sucesso: ", result);
        }catch(err){
            console.error("Erro ao inserir um produto", err);
        }
    }
} 