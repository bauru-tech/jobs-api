import { HttpModule, Module } from '@nestjs/common';
import { LecomService } from './lecom.service';
import { LecomRepository } from './lecom.repository';
import { LecomParser } from './lecom.parser';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    LecomService,
    LecomRepository,
    LecomParser,
  ],
  exports: [
    LecomService,
  ],
})
export class LecomModule {}
