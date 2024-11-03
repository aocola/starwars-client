import { ResponseDto } from '../../../common/dto/response.dto';
import { GetFilmService } from "../../applicatiton/use-case/get-film.service";
import { Film } from "../../domain/entities/film.entity";
import { Controller, Get, Param, HttpStatus } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";


@Controller('film')
export class FilmGetController {

    constructor(private service: GetFilmService){}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute(dto.id);
            return ResponseDto.success<Film>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Film>("Error en Peliculas", error,HttpStatus.BAD_REQUEST);
        } 
    }
}