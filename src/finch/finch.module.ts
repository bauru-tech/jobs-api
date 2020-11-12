import { HttpModule, Module } from '@nestjs/common';
import { FinchService } from './finch.service';
import { FinchParser } from './finch.parser';
import { FinchRepository } from './finch.repository';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    FinchService,
    FinchRepository,
    FinchParser,
  ],
  exports: [
    FinchService,
  ]
})
export class FinchModule {}
