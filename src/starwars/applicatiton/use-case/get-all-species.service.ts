import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Specie } from "../../domain/entities/specie.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { SpeciesResource } from "../../infrastructure/client/dto/species-resource.dto";

@CustomInjectable()
export class GetAllSpeciesService {
    constructor(private readonly repository: ServiceRepository<SpeciesResource>) {}

    async execute(): Promise<Specie[] | null> {
        const speciesResources = await this.repository.getAll();
        return speciesResources.map(specie => {
            return Specie.create({
                nombre: specie.name,
                clasificacion: specie.classification,
                designacion: specie.designation,
                alturaPromedio: specie.average_height,
                esperanzaVidaPromedio: specie.average_lifespan,
                coloresOjos: specie.eye_colors,
                coloresCabello: specie.hair_colors,
                coloresPiel: specie.skin_colors,
                idioma: specie.language,
                mundoOrigen: specie.homeworld,
                personas: specie.people,
                peliculas: specie.films,
            });
        }) || [];
    }
}
