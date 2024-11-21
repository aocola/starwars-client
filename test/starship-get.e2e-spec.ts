import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetSpeciesService } from '../src/starwars/applicatiton/use-case/get-species.service';
import { SpeciesGetController } from '../src/starwars/infrastructure/controller/species-get-controller';

describe('SpeciesGetController', () => {
  let app: INestApplication;
  let service: GetSpeciesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesGetController],
      providers: [
        {
          provide: GetSpeciesService,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: '1',
              nombre: 'Human',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetSpeciesService>(GetSpeciesService);
    await app.init();
  });

  it('/GET species/:id (200)', async () => {
    return request(app.getHttpServer())
      .get('/species/1')
      .expect(302)
      .expect({
        data: { id: '1', nombre: 'Human' },
        message: 'Operación satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET species/:id (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/species/1')
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
