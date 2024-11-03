import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllStarshipService } from "../../applicatiton/use-case/get-all-starship.service";
import { Starship } from "../../domain/entities/starship.entity";

@Controller('starship')
export class StarshipGetAllController {

    constructor(private service: GetAllStarshipService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Starship[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Starship[]>("Error en Naves Espaciales", error,HttpStatus.BAD_REQUEST);
        } 
    }
}