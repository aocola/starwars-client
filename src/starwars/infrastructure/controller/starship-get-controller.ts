import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";
import { GetStarshipService } from "../../applicatiton/use-case/get-starship.service";
import { ResponseDto } from "../../../common/dto/response.dto";
import { Starship } from "../../domain/entities/starship.entity";

@Controller('starship')
export class StarshipGetController {

    constructor(private service: GetStarshipService) {}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data = await this.service.execute(dto.id);
            return ResponseDto.success<Starship>(data, "Operación satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Starship>("Error en Naves Espaciales", error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
