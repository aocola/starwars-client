
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { PlanetResource } from "../dto/planet-resource.dto";



@CustomInjectable()
export class PlanetService implements ServiceRepository<PlanetResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }

    async getAll(): Promise<PlanetResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/planets`);
        return lastValueFrom(response).then(res => res.data.results);
    }
    async getById(id: string): Promise<PlanetResource> {
        const response = this.httpService.get(`${this.baseUrl}/planets/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}