import { Controller, Get, Inject } from '@nestjs/common';
import { Job } from './support/support.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  /**
   * The Service.
   *
   * @protected
   */
  @Inject(AppService)
  protected service: AppService;

  @Get()
  getHello(): Record<string, boolean> {
    return { success: true };
  }

  /**
   * Get all jobs from all companies.
   *
   * @return {Promise<Job[]>}
   */
  @Get('/jobs')
  async getJobs(): Promise<Job[]> {
    return this.service.getJobs();
  }
}
