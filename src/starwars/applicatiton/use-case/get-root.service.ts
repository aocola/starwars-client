import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Root } from "../../domain/entities/root.entity";
import { ServiceRootRepository } from "../../domain/repository/service-root.repository";
import { RootResource } from "../../infrastructure/client/dto/root-resource.dto";

@CustomInjectable()
export class GetRootService {
    constructor(private readonly repository: ServiceRootRepository<RootResource>) {}

    async execute(): Promise<Root | null> {
        const rootResource = await this.repository.get();
        if(rootResource){
            return Root.create({
                peliculas: rootResource.films,
                personas: rootResource.people,
                planetas: rootResource.planets,
                especies: rootResource.species,
                navesEspaciales: rootResource.starships,
                vehiculos: rootResource.vehicles,
            });
        }
               
    }
}
