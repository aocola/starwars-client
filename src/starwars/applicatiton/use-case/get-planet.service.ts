import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Planet } from "../../domain/entities/planet.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { PlanetResource } from "../../infrastructure/client/dto/planet-resource.dto";

@CustomInjectable()
export class GetPlanetService {
    constructor(private readonly repository: ServiceRepository<PlanetResource>) {}

    async execute(id: string): Promise<Planet | null> {
        const planetResource = await this.repository.getById(id);

        if (planetResource) {
            return Planet.create({
                nombre: planetResource.name,
                diametro: planetResource.diameter,
                periodoRotacion: planetResource.rotation_period,
                periodoOrbital: planetResource.orbital_period,
                gravedad: planetResource.gravity,
                poblacion: planetResource.population,
                clima: planetResource.climate,
                terreno: planetResource.terrain,
                aguaSuperficie: planetResource.surface_water,
                residentes: planetResource.residents,
                peliculas: planetResource.films,
            });
        }

        return null;
    }
}
