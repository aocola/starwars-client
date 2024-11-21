import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetVehicleService } from '../src/starwars/applicatiton/use-case/get-vehicle.service';
import { VehicleGetController } from '../src/starwars/infrastructure/controller/vehicle-get-controller';
import { describe, it } from 'node:test';

describe('VehicleGetController', () => {
  let app: INestApplication;
  let service: GetVehicleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleGetController],
      providers: [
        {
          provide: GetVehicleService,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: '1',
              nombre: 'Speeder',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetVehicleService>(GetVehicleService);
    await app.init();
  });

  it('/GET vehicle/:id (200)', async () => {
    return request(app.getHttpServer())
      .get('/vehicle/1')
      .expect(302)
      .expect({
        data: { id: '1', nombre: 'Speeder' },
        message: 'Operación satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET vehicle/:id (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/vehicle/1')
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
