import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { FilmResource } from "../dto/film-resource.dto";



@CustomInjectable()
export class FilmService implements ServiceRepository<FilmResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }

    async getAll(): Promise<FilmResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/films`);
        return lastValueFrom(response).then(res => res.data.results);
    }
    async getById(id: string): Promise<FilmResource> {
        const response = this.httpService.get(`${this.baseUrl}/films/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}