import { Injectable } from '@nestjs/common';
import { HasJobs } from './support/support.interface';

@Injectable()
export class Companies {
  /**
   * Get companies.
   */
  getCompanies(): HasJobs[] {
    return [
    ];
  }
}
