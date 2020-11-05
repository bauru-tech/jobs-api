import { HttpModule, Module } from '@nestjs/common';
import { GalataService } from './galata.service';
import { GalataRepository } from './galata.repository';
import { GalataParser } from './galata.parser';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    GalataService,
    GalataRepository,
    GalataParser,
  ],
  exports: [
    GalataService,
  ]
})
export class GalataModule {}
