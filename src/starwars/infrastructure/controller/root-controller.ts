import { Controller, Get, HttpStatus } from "@nestjs/common"
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetRootService } from "../../applicatiton/use-case/get-root.service";
import { Root } from "../../domain/entities/root.entity";

@Controller('root')
export class RootGetAllController {

    constructor(private service: GetRootService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Root>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Root>("Error en Raíz", error,HttpStatus.BAD_REQUEST);
        } 
    }
}