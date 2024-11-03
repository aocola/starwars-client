import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehicleGetController } from './infrastructure/controller/vehicle-get-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { VehicleService } from './infrastructure/client/service/vehicle.service';
import { GetVehicleService } from './applicatiton/use-case/get-vehicle.service';
import { VehicleGetAllController } from './infrastructure/controller/vehicle-get-all-controller';
import { GetAllVehicleService } from './applicatiton/use-case/get-all-vehicle.service';

@Module({
  imports: [HttpModule],
  controllers: [VehicleGetController, VehicleGetAllController],
  providers: [
    GetAllVehicleService,
    GetVehicleService,
    VehicleService,
    {
      provide: ServiceRepository,
      useExisting: VehicleService,
    },
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
