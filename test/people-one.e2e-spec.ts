import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PeopleGetController } from '../src/starwars/infrastructure/controller/people-get-controller';
import { GetPeopleService } from '../src/starwars/applicatiton/use-case/get-people.service';

describe('PeopleGetController', () => {
  let app: INestApplication;
  let service: GetPeopleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleGetController],
      providers: [
        {
          provide: GetPeopleService,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: '1',
              nombre: 'Luke Skywalker',
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetPeopleService>(GetPeopleService);
    await app.init();
  });

  it('/GET people/:id (200)', async () => {
    return request(app.getHttpServer())
      .get('/people/1')
      .expect(302)
      .expect({
        data: { id: '1', nombre: 'Luke Skywalker' },
        message: 'Operación satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET people/:id (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/people/1')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Personas',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
