import { Inject, Injectable } from '@nestjs/common';
import { Job } from '../support/support.interface';
import { FinchRepository } from './finch.repository';
import { FinchParser } from './finch.parser';

@Injectable()
export class FinchService {
  /**
   * FinchRepository.
   *
   * @protected
   */
  @Inject(FinchRepository)
  protected repository: FinchRepository;

  /**
   * FinchParser.
   *
   * @protected
   */
  @Inject(FinchParser)
  protected parser: FinchParser;

  /**
   * Find jobs.
   *
   * @return {Promise<Job[]>}
   */
  public async findJobs(): Promise<Job[]> {
    let hasMorePages = true;
    let page = 1;
    let jobs: Job[] = [];

    while (hasMorePages) {
      const jobsResponse = await this.repository.getJobsResponse(page);

      hasMorePages = this.parser.hasMorePages(jobsResponse);
      jobs = jobs.concat(this.parser.parseJobs(jobsResponse));

      page = hasMorePages ? page + 1 : page;
    }

    return await Promise.all(
      jobs.map(async job => {
        const jobDetailsResponse = await this.repository.getJobDetailsResponse(job.link);

        return {
          ...job,
          description: this.parser.parseDescription(jobDetailsResponse),
        };
      })
    );
  }
}
