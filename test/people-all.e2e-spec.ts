import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PeopleGetAllController } from '../src/starwars/infrastructure/controller/people-get-all-controller';
import { GetAllPeopleService } from '../src/starwars/applicatiton/use-case/get-all-people.service';

describe('PeopleGetAllController', () => {
  let app: INestApplication;
  let service: GetAllPeopleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleGetAllController],
      providers: [
        {
          provide: GetAllPeopleService,
          useValue: { execute: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetAllPeopleService>(GetAllPeopleService);
    await app.init();
  });

  it('/GET people (200)', async () => {
    return request(app.getHttpServer())
      .get('/people')
      .expect(302)
      .expect({
        data: [],
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET people (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/people')
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
