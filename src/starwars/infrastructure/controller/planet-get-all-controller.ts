import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllPlanetService } from "../../applicatiton/use-case/get-all-planet.service";
import { Planet } from "../../domain/entities/planet.entity";

@Controller('planet')
export class PlanetGetAllController {

    constructor(private service: GetAllPlanetService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Planet[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Planet[]>("Error en Planetas", error,HttpStatus.BAD_REQUEST);
        } 
    }
}