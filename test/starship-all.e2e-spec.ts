import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StarshipGetAllController } from '../src/starwars/infrastructure/controller/starship-get-all-controller';
import { GetAllStarshipService } from '../src/starwars/applicatiton/use-case/get-all-starship.service';

describe('StarshipGetAllController', () => {
  let app: INestApplication;
  let service: GetAllStarshipService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipGetAllController],
      providers: [
        {
          provide: GetAllStarshipService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllStarshipService>(GetAllStarshipService);
    await app.init();
  });

  it('/GET starship (200)', async () => {
    return request(app.getHttpServer())
      .get('/starship')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET starship (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/starship')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Naves Espaciales',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
