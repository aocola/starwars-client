import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomInjectable } from "../../../../common/dependecy-injection/injectable";
import { RootResource } from "../dto/root-resource.dto";
import { ServiceRootRepository } from "../../../domain/repository/service-root.repository";



@CustomInjectable()
export class RootService implements ServiceRootRepository<RootResource> {
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = 'https://swapi.py4e.com/api';
    }
    
    async get(): Promise<RootResource> {
        const response = this.httpService.get(`${this.baseUrl}`);
        return lastValueFrom(response)
            .then(res => res.data)
            .catch(() => null);
    }

}