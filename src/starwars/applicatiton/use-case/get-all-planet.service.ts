import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Planet } from "../../domain/entities/planet.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { PlanetResource } from "../../infrastructure/client/dto/planet-resource.dto";

@CustomInjectable()
export class GetAllPlanetService {
    constructor(private readonly repository: ServiceRepository<PlanetResource>) {}

    async execute(): Promise<Planet[] | null> {
        const planetResources = await this.repository.getAll();
        return planetResources.map(planet => {
            return Planet.create({
                nombre: planet.name,
                diametro: planet.diameter,
                periodoRotacion: planet.rotation_period,
                periodoOrbital: planet.orbital_period,
                gravedad: planet.gravity,
                poblacion: planet.population,
                clima: planet.climate,
                terreno: planet.terrain,
                aguaSuperficie: planet.surface_water,
                residentes: planet.residents,
                peliculas: planet.films,
            });
        }) || [];
    }
}
