import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Specie } from "../../domain/entities/specie.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { SpeciesResource } from "../../infrastructure/client/dto/species-resource.dto";

@CustomInjectable()
export class GetSpeciesService {
    constructor(private readonly repository: ServiceRepository<SpeciesResource>) {}

    async execute(id: string): Promise<Specie | null> {
        const specieResource = await this.repository.getById(id);

        if (specieResource) {
            return Specie.create({
                nombre: specieResource.name,
                clasificacion: specieResource.classification,
                designacion: specieResource.designation,
                alturaPromedio: specieResource.average_height,
                esperanzaVidaPromedio: specieResource.average_lifespan,
                coloresOjos: specieResource.eye_colors,
                coloresCabello: specieResource.hair_colors,
                coloresPiel: specieResource.skin_colors,
                idioma: specieResource.language,
                mundoOrigen: specieResource.homeworld,
                personas: specieResource.people,
                peliculas: specieResource.films,
            });
        }

        return null;
    }
}
