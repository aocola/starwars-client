import { Module } from '@nestjs/common';
import { FilmModule } from './starwars/film.module';
import { PeopleModule } from './starwars/people.module';
import { VehicleModule } from './starwars/vehicle.module';
import { StarshipModule } from './starwars/starship.module';
import { PlanetModule } from './starwars/planet.module';
import { SpeciesModule } from './starwars/species.module';
import { RootModule } from './starwars/root.module';

@Module({
  imports: [FilmModule,
            PeopleModule,
            VehicleModule,
            StarshipModule,
            PlanetModule,
            SpeciesModule,
            RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
