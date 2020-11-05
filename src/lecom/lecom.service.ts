import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { LecomParser } from './lecom.parser';
import { LecomRepository } from './lecom.repository';

@Injectable()
export class LecomService implements HasJobs {
  /**
   * LecomRepository.
   *
   * @protected
   */
  @Inject(LecomRepository)
  protected repository: LecomRepository;

  /**
   * LecomParser.
   *
   * @protected
   */
  @Inject(LecomParser)
  protected parser: LecomParser;

  /**
   * Find jobs from company.
   *
   * @return {Promise<Job[]>}
   */
  public async findJobs(): Promise<Job[]> {
    const jobsListResponse = await this.repository.getJobsListResponse();

    return this.parser.parseJobs(jobsListResponse);
  }
}
