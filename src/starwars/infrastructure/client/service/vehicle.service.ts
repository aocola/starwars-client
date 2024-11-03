import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { ServiceRepository } from "../../../domain/repository/service.repository";
import { VehicleResource } from "../dto/vehicle-resource.dto";



@CustomInjectable()
export class VehicleService implements ServiceRepository<VehicleResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }
    
    async getAll(): Promise<VehicleResource[]> {
        const response = this.httpService.get(`${this.baseUrl}/vehicles`);
        return lastValueFrom(response).then(res => res.data.results);
    }
    async getById(id: string): Promise<VehicleResource> {
        const response = this.httpService.get(`${this.baseUrl}/vehicles/${id}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}