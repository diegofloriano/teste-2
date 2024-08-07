import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";
import { Controller, Route, Tags, Body, Res, Post, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ProductRequestDto } from "../model/dto/ProductRequestDto";

@Route("product")
@Tags("Product")
export class ProductController extends Controller{
    productService = new ProductService();

    @Post()
    async cadastrarProduto (
    @Body () dto: ProductRequestDto,
    @Res () fail: TsoaResponse<400, BasicResponseDto >,
    @Res () success: TsoaResponse<201, BasicResponseDto>
    ): Promise < | void > {
        try {
            const product = await this . productService.cadastrarProduto (dto) ;
            return success(201 , new BasicResponseDto("Produto criado com sucesso !", product)) ;
        }catch (error: any ) {
            return fail(400, new BasicResponseDto(error.message, undefined)) ;
        }
     }
    
}
    
