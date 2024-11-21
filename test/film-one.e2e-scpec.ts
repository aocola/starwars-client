import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilmGetController } from '../src/starwars/infrastructure/controller/film-get-controller';
import { GetFilmService } from '../src/starwars/applicatiton/use-case/get-film.service';

describe('FilmGetController', () => {
  let app: INestApplication;
  let service: GetFilmService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmGetController],
      providers: [
        {
          provide: GetFilmService,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: '1',
              titulo: 'A New Hope',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetFilmService>(GetFilmService);
    await app.init();
  });

  it('/GET film/:id (200)', async () => {
    return request(app.getHttpServer())
      .get('/film/1')
      .expect(302)
      .expect({
        data: { id: '1', titulo: 'A New Hope' },
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET film/:id (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/film/1')
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
