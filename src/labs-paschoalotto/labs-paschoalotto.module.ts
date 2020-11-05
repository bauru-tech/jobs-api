import { HttpModule, Module } from '@nestjs/common';
import { LabsPaschoalottoService } from './labs-paschoalotto.service';
import { LabsPaschoalottoRepository } from './labs-paschoalotto.repository';
import { LabsPaschoalottoParser } from './labs-paschoalotto.parser';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    LabsPaschoalottoService,
    LabsPaschoalottoRepository,
    LabsPaschoalottoParser
  ],
  exports: [
    LabsPaschoalottoService
  ]
})
export class LabsPaschoalottoModule {}
