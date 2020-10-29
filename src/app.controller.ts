import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): Record<string, boolean> {
    return { success: true };
  }
}
