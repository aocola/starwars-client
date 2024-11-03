import { Controller, Get, HttpStatus, NotFoundException } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllFilmService } from "../../applicatiton/use-case/get-all-film.service";
import { Film } from "../../domain/entities/film.entity";

@Controller('film')
export class FilmGetAllController {

    constructor(private service: GetAllFilmService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Film[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Film[]>("Error en Peliculas", error,HttpStatus.BAD_REQUEST);
        } 
    }
}