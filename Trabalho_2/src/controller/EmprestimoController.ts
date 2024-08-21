import { EmprestimoService } from "../service/EmprestimoService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller {
    emprestimoService = new EmprestimoService();

    @Post()
    async cadastrarEmprestimo(
        @Body() dto: EmprestimoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.cadastrarEmprestimo(dto);
            return success(201, new BasicResponseDto("Emprestimo criado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(dto);
            return success(200, new BasicResponseDto("Emprestimo atualizado com sucesso!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.deletarEmprestimo(dto);
            return success(200, new BasicResponseDto("Emprestimo deletado com sucesso!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarEmprestimoPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.filtrarEmprestimoById(id);
            return success(200, new BasicResponseDto("Emprestimo encontrado!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async filtrarEmprestimoPorNome(
        @Query() name: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos: EmprestimoEntity[] = await this.emprestimoService.filtrarEmprestimoByName(name);
            return success(200, new BasicResponseDto("Emprestimo encontrado!", emprestimos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosEmprestimo(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos: EmprestimoEntity[] = await this.emprestimoService.listarTodosEmprestimos();
            return success(200, new BasicResponseDto("Emprestimos listados com sucesso!", emprestimos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}