import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { PeopleResource } from '../dto/people-resource.dto';

@CustomInjectable()
export class PeopleService implements ServiceRepository<PeopleResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }

    async getAll(): Promise<PeopleResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/people`);
        return lastValueFrom(response).then(res => res.data.results);
    }

    async getById(id: string): Promise<PeopleResource | null> {
        const response = this.httpService.get(`${this.baseUrl}/people/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null); // Manejo de error, devolviendo null si no encuentra el recurso
    }
}
