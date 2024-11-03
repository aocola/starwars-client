import { Controller, Get, HttpStatus, NotFoundException, Param } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";
import { GetPlanetService } from "../../applicatiton/use-case/get-planet.service";
import { ResponseDto } from "../../../common/dto/response.dto";
import { Planet } from "../../domain/entities/planet.entity";

@Controller('planet')
export class PlanetGetController {

    constructor(private service: GetPlanetService) {}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data = await this.service.execute(dto.id);
            return ResponseDto.success<Planet>(data, "Operación satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Planet>("Error en Planetas", error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
