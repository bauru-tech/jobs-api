import { HttpModule, Module } from '@nestjs/common';
import { NeoAssistService } from './neo-assist.service';
import { NeoAssistParser } from './neo-assist.parser';
import { NeoAssistRepository } from './neo-assist.repository';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    NeoAssistService,
    NeoAssistRepository,
    NeoAssistParser,
  ],
  exports: [
    NeoAssistService,
  ],
})
export class NeoAssistModule {}
