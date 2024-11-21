import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetAllSpeciesService } from '../src/starwars/applicatiton/use-case/get-all-species.service';
import { SpeciesGetAllController } from '../src/starwars/infrastructure/controller/species-get-all-controller';

describe('SpeciesGetAllController', () => {
  let app: INestApplication;
  let service: GetAllSpeciesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesGetAllController],
      providers: [
        {
          provide: GetAllSpeciesService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllSpeciesService>(GetAllSpeciesService);
    await app.init();
  });

  it('/GET species (200)', async () => {
    return request(app.getHttpServer())
      .get('/species')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET species (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/species')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Especies',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
