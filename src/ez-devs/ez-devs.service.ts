import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { EzDevsRepository } from './ez-devs.repository';
import { EzDevsParser } from './ez-devs.parser';

@Injectable()
export class EzDevsService implements HasJobs {
  /**
   * EzDevsRepository.
   *
   * @protected
   */
  @Inject(EzDevsRepository)
  protected repository: EzDevsRepository;

  /**
   * EzDevsParser.
   *
   * @protected
   */
  @Inject(EzDevsParser)
  protected parser: EzDevsParser;

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
