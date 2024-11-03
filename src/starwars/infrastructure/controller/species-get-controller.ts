import { Controller, Get, HttpStatus, NotFoundException, Param } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";
import { GetSpeciesService } from "../../applicatiton/use-case/get-species.service";
import { ResponseDto } from "../../../common/dto/response.dto";
import { Specie } from "../../domain/entities/specie.entity";

@Controller('species')
export class SpeciesGetController {

    constructor(private service: GetSpeciesService) {}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data = await this.service.execute(dto.id);
            return ResponseDto.success<Specie>(data, "Operación satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Specie>("Error en Especies", error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
