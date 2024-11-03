import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Film } from "../../domain/entities/film.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { FilmResource } from "../../infrastructure/client/dto/film-resource.dto";

@CustomInjectable()
export class GetFilmService {
    constructor(private readonly repository: ServiceRepository<FilmResource>) {}

    async execute(id: string): Promise<Film | null> {
        const filmResource = await this.repository.getById(id);
        
        if (filmResource) {
            return Film.create({
                titulo: filmResource.title,
                episodioId: filmResource.episode_id,
                aperturaTexto: filmResource.opening_crawl,
                director: filmResource.director,
                productor: filmResource.producer,
                fechaEstreno: filmResource.release_date,
                especies: filmResource.species,
                navesEspaciales: filmResource.starships,
                vehiculos: filmResource.vehicles,
                personajes: filmResource.characters,
                planetas: filmResource.planets,
            });
        }
        
        return null;
    }
}
