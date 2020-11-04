import { HttpModule, Module } from '@nestjs/common';
import { EzDevsService } from './ez-devs.service';
import { EzDevsRepository } from './ez-devs.repository';
import { EzDevsParser } from './ez-devs.parser';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    EzDevsService,
    EzDevsRepository,
    EzDevsParser,
  ],
  exports: [
    EzDevsService,
  ],
})
export class EzDevsModule {}
