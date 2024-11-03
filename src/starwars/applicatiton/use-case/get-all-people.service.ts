import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { People } from "../../domain/entities/people.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { PeopleResource } from "../../infrastructure/client/dto/people-resource.dto";

@CustomInjectable()
export class GetAllPeopleService {
    constructor(private readonly repository: ServiceRepository<PeopleResource>) {}

    async execute(): Promise<People[] | null> {
        const peopleResource = await this.repository.getAll();
        return peopleResource.map(people=>{
                return People.create({
                    nombre: people.name,
                    anioNacimiento: people.birth_year,
                    colorOjos: people.eye_color,
                    genero: people.gender,
                    colorCabello: people.hair_color,
                    altura: people.height,
                    masa: people.mass,
                    colorPiel: people.skin_color,
                    mundoOrigen: people.homeworld,
                    peliculas: people.films,
                    especies: people.species,
                    navesEspaciales: people.starships,
                    vehiculos: people.vehicles,
                });
            }) || [];
    }
}
