import { Controller, Get, HttpStatus, NotFoundException, Param } from "@nestjs/common";
import { GetByIdHttpDto } from "./dto/get-by-id-http.dto";
import { GetVehicleService } from "../../applicatiton/use-case/get-vehicle.service";
import { ResponseDto } from "../../../common/dto/response.dto";
import { Vehicle } from "../../domain/entities/vehicle.entity";

@Controller('vehicle')
export class VehicleGetController {

    constructor(private service: GetVehicleService) {}

    @Get(':id')
    async run(@Param() dto: GetByIdHttpDto): Promise<ResponseDto<object>> {
        try {
            const data = await this.service.execute(dto.id);
            return ResponseDto.success<Vehicle>(data, "Operación satisfactoria", HttpStatus.FOUND);
        } catch (error) {
            return ResponseDto.error<Vehicle>("Error en Vehículo", error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
