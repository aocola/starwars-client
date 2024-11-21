import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { VehicleGetAllController } from '../src/starwars/infrastructure/controller/vehicle-get-all-controller';
import { GetAllVehicleService } from '../src/starwars/applicatiton/use-case/get-all-vehicle.service';

describe('VehicleGetAllController', () => {
  let app: INestApplication;
  let service: GetAllVehicleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleGetAllController],
      providers: [
        {
          provide: GetAllVehicleService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllVehicleService>(GetAllVehicleService);
    await app.init();
  });

  it('/GET vehicle (200)', async () => {
    return request(app.getHttpServer())
      .get('/vehicle')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET vehicle (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/vehicle')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Vehículo',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
