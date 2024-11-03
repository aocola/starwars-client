import { Controller, Get, HttpStatus, NotFoundException, Param } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";
import { GetPeopleService } from "../../applicatiton/use-case/get-people.service";
import { ResponseDto } from "../../../common/dto/response.dto";
import { People } from "../../domain/entities/people.entity";

@Controller('people')
export class PeopleGetController {

    constructor(private service: GetPeopleService) {}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data = await this.service.execute(dto.id);
            return ResponseDto.success<People>(data, "Operación satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<People>("Error en Personas", error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
