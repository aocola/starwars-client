import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpeciesGetController } from './infrastructure/controller/species-get-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { SpeciesService } from './infrastructure/client/service/species.service';
import { GetSpeciesService } from './applicatiton/use-case/get-species.service';
import { SpeciesGetAllController } from './infrastructure/controller/species-get-all-controller';
import { GetAllSpeciesService } from './applicatiton/use-case/get-all-species.service';

@Module({
  imports: [HttpModule],
  controllers: [SpeciesGetController, SpeciesGetAllController],
  providers: [
    GetAllSpeciesService,
    GetSpeciesService,
    SpeciesService,
    {
      provide: ServiceRepository,
      useExisting: SpeciesService,
    },
  ],
  exports: [SpeciesService],
})
export class SpeciesModule {}
