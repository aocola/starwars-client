import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServiceRepository } from './domain/repository/service.repository';
import { RootGetAllController } from './infrastructure/controller/root-controller';
import { GetRootService } from './applicatiton/use-case/get-root.service';
import { RootService } from './infrastructure/client/service/root.service';
import { ServiceRootRepository } from './domain/repository/service-root.repository';

@Module({
  imports: [HttpModule],
  controllers: [RootGetAllController],
  providers: [
    GetRootService,
    RootService,
    {
      provide: ServiceRootRepository,
      useExisting: RootService,
    },
  ],
  exports: [RootService],
})
export class RootModule {}
