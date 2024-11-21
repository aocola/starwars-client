import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetPlanetService } from '../src/starwars/applicatiton/use-case/get-planet.service';
import { PlanetGetController } from '../src/starwars/infrastructure/controller/planet-get-controller';

describe('PlanetGetController', () => {
  let app: INestApplication;
  let service: GetPlanetService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetGetController],
      providers: [
        {
          provide: GetPlanetService,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: '1',
              nombre: 'Tatooine',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetPlanetService>(GetPlanetService);
    await app.init();
  });

  it('/GET planet/:id (200)', async () => {
    return request(app.getHttpServer())
      .get('/planet/1')
      .expect(302)
      .expect({
        data: { id: '1', nombre: 'Tatooine' },
        message: 'Operación satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET planet/:id (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/planet/1')
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
