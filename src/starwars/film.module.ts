import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule to provide HttpService
import { FilmGetController } from './infrastructure/controller/film-get-controller';
import { FilmGetAllController } from './infrastructure/controller/film-get-all-controller';
import { ServiceRepository } from './domain/repository/service.repository';
import { FilmService } from './infrastructure/client/service/film.service';
import { GetAllFilmService } from './applicatiton/use-case/get-all-film.service';
import { GetFilmService } from './applicatiton/use-case/get-film.service';

@Module({
  imports: [HttpModule], // Import HttpModule to use HttpService
  controllers: [
    FilmGetController,
    FilmGetAllController,
  ],
  providers: [
    GetAllFilmService,
    GetFilmService,
    FilmService, // Register FilmService as a provider
    {
      provide: ServiceRepository,
      useExisting: FilmService, // Map ServiceRepository to FilmService
    },
  ],
  exports: [FilmService], // Optionally export FilmService if needed in other modules
})
export class FilmModule {}
