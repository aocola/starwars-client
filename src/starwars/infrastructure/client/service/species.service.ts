import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { SpeciesResource } from "../dto/species-resource.dto";



@CustomInjectable()
export class SpeciesService implements ServiceRepository<SpeciesResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }
    
    async getAll(): Promise<SpeciesResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/species`);
        return lastValueFrom(response).then(res => res.data.results);
    }
    async getById(id: string): Promise<SpeciesResource> {
        const response = this.httpService.get(`${this.baseUrl}/species/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}