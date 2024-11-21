import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetAllFilmService } from '../src/starwars/applicatiton/use-case/get-all-film.service';
import { FilmGetAllController } from '../src/starwars/infrastructure/controller/film-get-all-controller';

describe('FilmGetAllController', () => {
  let app: INestApplication;
  let service: GetAllFilmService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmGetAllController],
      providers: [
        {
          provide: GetAllFilmService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllFilmService>(GetAllFilmService);
    await app.init();
  });

  it('/GET film (200)', async () => {
    return request(app.getHttpServer())
      .get('/film')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET film (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/film')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Peliculas',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
