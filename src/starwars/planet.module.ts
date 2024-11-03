import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlanetGetController } from './infrastructure/controller/planet-get-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { PlanetService } from './infrastructure/client/service/planet.service';
import { GetPlanetService } from './applicatiton/use-case/get-planet.service';
import { PlanetGetAllController } from './infrastructure/controller/planet-get-all-controller';
import { GetAllPlanetService } from './applicatiton/use-case/get-all-planet.service';

@Module({
  imports: [HttpModule],
  controllers: [PlanetGetController, PlanetGetAllController],
  providers: [
    GetAllPlanetService,
    GetPlanetService,
    PlanetService,
    {
      provide: ServiceRepository,
      useExisting: PlanetService,
    },
  ],
  exports: [PlanetService],
})
export class PlanetModule {}
