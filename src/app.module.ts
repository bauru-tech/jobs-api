import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Companies } from './companies';
import { NeoAssistModule } from './neo-assist/neo-assist.module';
import { EzDevsModule } from './ez-devs/ez-devs.module';
import { FireworkModule } from './firework/firework.module';
import { ArcaSolutionsModule } from './arca-solutions/arca-solutions.module';
import { NewWayModule } from './new-way/new-way.module';
import { LabsPaschoalottoModule } from './labs-paschoalotto/labs-paschoalotto.module'
import { GalataModule } from './galata/galata.module';

@Module({
  imports: [
    NeoAssistModule,
    EzDevsModule,
    FireworkModule,
    ArcaSolutionsModule,
    NewWayModule,
    LabsPaschoalottoModule,
    GalataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Companies,
  ],
})
export class AppModule {}
