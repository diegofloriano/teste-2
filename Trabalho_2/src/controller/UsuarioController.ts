import { UsuarioService } from "../service/UsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {
    usuarioService = new UsuarioService();

    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuario criado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto);
            return success(200, new BasicResponseDto("Usuario atualizado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.deletarUsuario(dto);
            return success(200, new BasicResponseDto("Usuario deletado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarUsuarioPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.filtrarUsuarioById(id);
            return success(200, new BasicResponseDto("Usuario encontrado!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async filtrarUsuarioPorNome(
        @Query() name: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios: UsuarioEntity[] = await this.usuarioService.filtrarUsuarioByName(name);
            return success(200, new BasicResponseDto("Usuario encontrado!", usuarios));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosUsuario(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios: UsuarioEntity[] = await this.usuarioService.listarTodosUsuarios();
            return success(200, new BasicResponseDto("Usuarios listados com sucesso!", usuarios));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}