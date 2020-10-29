import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Companies } from './companies';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    Companies,
  ],
})
export class AppModule {}
