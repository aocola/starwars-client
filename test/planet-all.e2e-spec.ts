import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetAllPlanetService } from '../src/starwars/applicatiton/use-case/get-all-planet.service';
import { PlanetGetAllController } from '../src/starwars/infrastructure/controller/planet-get-all-controller';

describe('PlanetGetAllController', () => {
  let app: INestApplication;
  let service: GetAllPlanetService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetGetAllController],
      providers: [
        {
          provide: GetAllPlanetService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllPlanetService>(GetAllPlanetService);
    await app.init();
  });

  it('/GET planet (200)', async () => {
    return request(app.getHttpServer())
      .get('/planet')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET planet (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/planet')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Planetas',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
