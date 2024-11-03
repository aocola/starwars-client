import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { People } from "../../domain/entities/people.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { PeopleResource } from "../../infrastructure/client/dto/people-resource.dto";

@CustomInjectable()
export class GetPeopleService {
    constructor(private readonly repository: ServiceRepository<PeopleResource>) {}

    async execute(id: string): Promise<People | null> {
        const peopleResource = await this.repository.getById(id);

        if (peopleResource) {
            return People.create({
                nombre: peopleResource.name,
                anioNacimiento: peopleResource.birth_year,
                colorOjos: peopleResource.eye_color,
                genero: peopleResource.gender,
                colorCabello: peopleResource.hair_color,
                altura: peopleResource.height,
                masa: peopleResource.mass,
                colorPiel: peopleResource.skin_color,
                mundoOrigen: peopleResource.homeworld,
                peliculas: peopleResource.films,
                especies: peopleResource.species,
                navesEspaciales: peopleResource.starships,
                vehiculos: peopleResource.vehicles,
            });
        }

        return null;
    }
}
