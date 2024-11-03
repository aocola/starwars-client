import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PeopleGetController } from './infrastructure/controller/people-get-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { PeopleService } from './infrastructure/client/service/people.service';
import { GetPeopleService } from './applicatiton/use-case/get-people.service';
import { PeopleGetAllController } from './infrastructure/controller/people-get-all-controller';
import { GetAllFilmService } from './applicatiton/use-case/get-all-film.service';
import { GetAllPeopleService } from './applicatiton/use-case/get-all-people.service';

@Module({
  imports: [HttpModule],
  controllers: [
    PeopleGetController, 
    PeopleGetAllController
    ],
  providers: [
    GetAllPeopleService,
    GetPeopleService,
    PeopleService,
    {
      provide: ServiceRepository,
      useExisting: PeopleService,
    },
  ],
  exports: [PeopleService],
})
export class PeopleModule {}
