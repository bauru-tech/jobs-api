import { HttpModule, Module } from '@nestjs/common';
import { NewWayService } from './new-way.service';
import { NewWayRepository } from './new-way.repository';
import { NewWayParser } from './new-way.parser';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    NewWayService,
    NewWayRepository,
    NewWayParser
  ],
  exports: [
    NewWayService
  ]
})
export class NewWayModule {}
