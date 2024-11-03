import { Controller, Get, HttpStatus, NotFoundException } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllSpeciesService } from "../../applicatiton/use-case/get-all-species.service";
import { Specie } from "../../domain/entities/specie.entity";

@Controller('species')
export class SpeciesGetAllController {

    constructor(private service: GetAllSpeciesService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Specie[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Specie[]>("Error en Especies", error,HttpStatus.BAD_REQUEST);
        } 
    }
}