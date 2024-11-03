import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Starship } from "../../domain/entities/starship.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { StarshipResource } from "../../infrastructure/client/dto/starship-resource.dto";

@CustomInjectable()
export class GetStarshipService {
    constructor(private readonly repository: ServiceRepository<StarshipResource>) {}

    async execute(id: string): Promise<Starship | null> {
        const starshipResource = await this.repository.getById(id);

        if (starshipResource) {
            return Starship.create({
                nombre: starshipResource.name,
                modelo: starshipResource.model,
                claseNaveEspacial: starshipResource.starship_class,
                fabricante: starshipResource.manufacturer,
                costoEnCreditos: starshipResource.cost_in_credits,
                longitud: starshipResource.length,
                tripulacion: starshipResource.crew,
                pasajeros: starshipResource.passengers,
                velocidadMaximaAtmosfera: starshipResource.max_atmosphering_speed,
                calificacionHiperimpulsor: starshipResource.hyperdrive_rating,
                mglt: starshipResource.MGLT,
                capacidadCarga: starshipResource.cargo_capacity,
                consumibles: starshipResource.consumables,
                peliculas: starshipResource.films,
                pilotos: starshipResource.pilots,
            });
        }

        return null;
    }
}