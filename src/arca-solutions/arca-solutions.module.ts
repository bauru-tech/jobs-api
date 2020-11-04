import { HttpModule, Module } from '@nestjs/common';
import { ArcaSolutionsService } from './arca-solutions.service';
import { ArcaSolutionsParser } from './arca-solutions.parser';
import { ArcaSolutionsRepository } from './arca-solutions.repository';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    ArcaSolutionsService,
    ArcaSolutionsRepository,
    ArcaSolutionsParser
  ],
  exports: [
    ArcaSolutionsService
  ]
})
export class ArcaSolutionsModule {}
