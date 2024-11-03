import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Vehicle } from "../../domain/entities/vehicle.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { VehicleResource } from "../../infrastructure/client/dto/vehicle-resource.dto";

@CustomInjectable()
export class GetVehicleService {
    constructor(private readonly repository: ServiceRepository<VehicleResource>) {}

    async execute(id: string): Promise<Vehicle | null> {
        const vehicleResource = await this.repository.getById(id);
        if (vehicleResource) {
            return Vehicle.create({
                nombre: vehicleResource.name,
                modelo: vehicleResource.model,
                claseVehiculo: vehicleResource.vehicle_class,
                fabricante: vehicleResource.manufacturer,
                longitud: vehicleResource.length,
                costoEnCreditos: vehicleResource.cost_in_credits,
                tripulacion: vehicleResource.crew,
                pasajeros: vehicleResource.passengers,
                velocidadMaximaAtmosfera: vehicleResource.max_atmosphering_speed,
                capacidadCarga: vehicleResource.cargo_capacity,
                consumibles: vehicleResource.consumables,
                peliculas: vehicleResource.films,
                pilotos: vehicleResource.pilots,
            });
        }

        return null;
    }
}
