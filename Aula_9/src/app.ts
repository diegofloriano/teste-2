console.log("Hello World");

import express, {Request, Response} from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

function appLog(){
    console.log("A API está disponivel no URL http://localhost:3000");
}


function hello(resq: Request,res: Response){
    return res.status(201).json({mensagem: "Hello World!!"});
}

app.get("/api/hello", hello);

app.listen(PORT, appLog);
