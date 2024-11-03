import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllPeopleService } from "../../applicatiton/use-case/get-all-people.service";
import { People } from "../../domain/entities/people.entity";

@Controller('people')
export class PeopleGetAllController {

    constructor(private service: GetAllPeopleService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<People[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<People[]>("Error en Personas", error,HttpStatus.BAD_REQUEST);
        } 
    }
}