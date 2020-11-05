import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { GalataRepository } from './galata.repository';
import { GalataParser } from './galata.parser';

@Injectable()
export class GalataService implements HasJobs {
  /**
   * GalataRepository.
   *
   * @protected
   */
  @Inject(GalataRepository)
  protected repository: GalataRepository;

  /**
   * GalataParser.
   *
   * @protected
   */
  @Inject(GalataParser)
  protected parser: GalataParser;

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
