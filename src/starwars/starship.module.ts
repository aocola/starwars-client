import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StarshipGetController } from './infrastructure/controller/starship-get-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { StarshipService } from './infrastructure/client/service/starship.service';
import { GetStarshipService } from './applicatiton/use-case/get-starship.service';
import { StarshipGetAllController } from './infrastructure/controller/starship-get-all-controller';
import { GetAllStarshipService } from './applicatiton/use-case/get-all-starship.service';

@Module({
  imports: [HttpModule],
  controllers: [StarshipGetController, StarshipGetAllController],
  providers: [
    GetAllStarshipService,
    GetStarshipService,
    StarshipService,
    {
      provide: ServiceRepository,
      useExisting: StarshipService,
    },
  ],
  exports: [StarshipService],
})
export class StarshipModule {}
