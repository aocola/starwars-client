import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Vehicle } from "../../domain/entities/vehicle.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { VehicleResource } from "../../infrastructure/client/dto/vehicle-resource.dto";

@CustomInjectable()
export class GetAllVehicleService {
    constructor(private readonly repository: ServiceRepository<VehicleResource>) {}

    async execute(): Promise<Vehicle[] | null> {
        const vehicleResources = await this.repository.getAll();
        return vehicleResources.map(vehicle => {
            return Vehicle.create({
                nombre: vehicle.name,
                modelo: vehicle.model,
                claseVehiculo: vehicle.vehicle_class,
                fabricante: vehicle.manufacturer,
                longitud: vehicle.length,
                costoEnCreditos: vehicle.cost_in_credits,
                tripulacion: vehicle.crew,
                pasajeros: vehicle.passengers,
                velocidadMaximaAtmosfera: vehicle.max_atmosphering_speed,
                capacidadCarga: vehicle.cargo_capacity,
                consumibles: vehicle.consumables,
                peliculas: vehicle.films,
                pilotos: vehicle.pilots,
            });
        }) || [];
    }
}
