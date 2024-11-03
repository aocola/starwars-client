import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { StarshipResource } from "../dto/starship-resource.dto";



@CustomInjectable()
export class StarshipService implements ServiceRepository<StarshipResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }
    
    async getAll(): Promise<StarshipResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/starships`);
        return lastValueFrom(response).then(res => res.data.results);
    }
    async getById(id: string): Promise<StarshipResource> {
        const response = this.httpService.get(`${this.baseUrl}/starships/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}