import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Companies } from './companies';
import { NeoAssistModule } from './neo-assist/neo-assist.module';
import { EzDevsModule } from './ez-devs/ez-devs.module';

@Module({
  imports: [
    NeoAssistModule,
    EzDevsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Companies,
  ],
})
export class AppModule {}
