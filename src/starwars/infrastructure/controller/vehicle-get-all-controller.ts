import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ResponseDto } from "../../../common/dto/response.dto";
import { GetAllVehicleService } from "../../applicatiton/use-case/get-all-vehicle.service";
import { Vehicle } from "../../domain/entities/vehicle.entity";

@Controller('vehicle')
export class VehicleGetAllController {

    constructor(private service: GetAllVehicleService){}

    @Get()
    async run(): Promise<ResponseDto<object>> {
        try {
            const data =  await this.service.execute();
            return ResponseDto.success<Vehicle[]>(data, "Operacion satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Vehicle[]>("Error en Vehículo", error,HttpStatus.BAD_REQUEST);
        } 
    }
}