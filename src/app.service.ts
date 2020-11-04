import { Inject, Injectable } from '@nestjs/common';
import { flatMap } from 'lodash';
import { HasJobs, Job } from './support/support.interface';
import { Companies } from './companies';

@Injectable()
export class AppService {
  @Inject(Companies)
  protected companies: Companies;
  /**
   * Get all jobs.
   *
   * @return {Promise<Job[]>}
   */
  async getJobs(): Promise<Job[]> {
    const companiesJobs: Array<Job[]> = await Promise.all(this.companies
      .getCompanies()
      .map((company: HasJobs) => {
        return company.findJobs().catch((err) => {
          return null;
        });
      }));

    return flatMap(companiesJobs)
      .filter(r => !!r);
  }
}
