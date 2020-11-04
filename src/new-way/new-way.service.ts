import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { NewWayParser } from './new-way.parser';
import { NewWayRepository } from './new-way.repository';

@Injectable()
export class NewWayService implements HasJobs {
  /**
   * NewWayRepository.
   *
   * @protected
   */
  @Inject(NewWayRepository)
  protected repository: NewWayRepository;

  /**
   * NewWayParser.
   *
   * @protected
   */
  @Inject(NewWayParser)
  protected parser: NewWayParser;

  /**
   * Find jobs from company.
   *
   * @return {Promise<Job[]>}
   */
  public async findJobs(): Promise<Job[]> {
    const jobsListResponse = await this.repository.getJobsListResponse();
    const jobsLinks = this.parser.extractJobsLinks(jobsListResponse);

    const jobsResponses = await Promise.all(jobsLinks.map((link: string) => {
      return this.repository
        .getJobResponse(link)
        .catch(() => null);
    }));

    return jobsResponses.filter(r => !!r)
      .map(response => this.parser.parseJob(response));
  }
}
