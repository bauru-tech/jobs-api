import { HttpModule, Module } from '@nestjs/common';
import { FireworkService } from './firework.service';
import { FireworkParser } from './firework.parser';
import { FireworkRepository } from './firework.repository';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    FireworkService,
    FireworkRepository,
    FireworkParser
  ],
  exports: [
    FireworkService,
  ],
})
export class FireworkModule {}
