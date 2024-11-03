import { CustomInjectable } from "../../../common/dependecy-injection/injectable";
import { Film } from "../../domain/entities/film.entity";
import { ServiceRepository } from "../../domain/repository/service.repository";
import { FilmResource } from "../../infrastructure/client/dto/film-resource.dto";

@CustomInjectable()
export class GetAllFilmService {
    constructor(private readonly repository: ServiceRepository<FilmResource>) {}

    async execute(): Promise<Film[] | null> {
        const filmResource = await this.repository.getAll();
        return filmResource.map(film=>{
                const value=  Film.create({
                    titulo: film.title,
                    episodioId: film.episode_id,
                    aperturaTexto: film.opening_crawl,
                    director: film.director,
                    productor: film.producer,
                    fechaEstreno: film.release_date,
                    especies: film.species,
                    navesEspaciales: film.starships,
                    vehiculos: film.vehicles,
                    personajes: film.characters,
                    planetas: film.planets,
                });
                return value;
            }) || [];
    }
}
