import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetRootService } from '../src/starwars/applicatiton/use-case/get-root.service';
import { RootGetAllController } from '../src/starwars/infrastructure/controller/root-controller';

describe('RootGetAllController', () => {
  let app: INestApplication;
  let service: GetRootService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootGetAllController],
      providers: [
        {
          provide: GetRootService,
          useValue: { execute: jest.fn().mockResolvedValue({}) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<GetRootService>(GetRootService);
    await app.init();
  });

  it('/GET root (200)', async () => {
    return request(app.getHttpServer())
      .get('/root')
      .expect(302)
      .expect({
        data: {},
        message: 'Operacion satisfactoria',
        statusCode: 302,
      });
  });

  it('/GET root (500)', async () => {
    jest.spyOn(service, 'execute').mockRejectedValueOnce(new Error('Test error'));
    return request(app.getHttpServer())
      .get('/root')
      .expect(400)
      .expect({
        data: null,
        message: 'Error en Raíz',
        statusCode: 400,
        error: 'Test error',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
