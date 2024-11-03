import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Starship } from "../../domain/entities/starship.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { StarshipResource } from "../../infrastructure/client/dto/starship-resource.dto";

@CustomInjectable()
export class GetAllStarshipService {
    constructor(private readonly repository: ServiceRepository<StarshipResource>) {}

    async execute(): Promise<Starship[] | null> {
        const starshipResources = await this.repository.getAll();
        return starshipResources.map(starship => {
            return Starship.create({
                nombre: starship.name,
                modelo: starship.model,
                claseNaveEspacial: starship.starship_class,
                fabricante: starship.manufacturer,
                costoEnCreditos: starship.cost_in_credits,
                longitud: starship.length,
                tripulacion: starship.crew,
                pasajeros: starship.passengers,
                velocidadMaximaAtmosfera: starship.max_atmosphering_speed,
                calificacionHiperimpulsor: starship.hyperdrive_rating,
                mglt: starship.MGLT,
                capacidadCarga: starship.cargo_capacity,
                consumibles: starship.consumables,
                peliculas: starship.films,
                pilotos: starship.pilots,
            });
        }) || [];
    }
}
