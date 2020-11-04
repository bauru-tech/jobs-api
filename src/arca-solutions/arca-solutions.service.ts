import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { EzDevsRepository } from '../ez-devs/ez-devs.repository';
import { EzDevsParser } from '../ez-devs/ez-devs.parser';
import { ArcaSolutionsRepository } from './arca-solutions.repository';
import { ArcaSolutionsParser } from './arca-solutions.parser';

@Injectable()
export class ArcaSolutionsService implements HasJobs {
  /**
   * ArcaSolutionsRepository.
   *
   * @protected
   */
  @Inject(ArcaSolutionsRepository)
  protected repository: ArcaSolutionsRepository;

  /**
   * ArcaSolutionsParser.
   *
   * @protected
   */
  @Inject(ArcaSolutionsParser)
  protected parser: ArcaSolutionsParser;

  /**
   * Find jobs.
   *
   * @return {Promise<Job[]>}
   */
  public async findJobs(): Promise<Job[]> {
    const jobsListResponse = await this.repository.getJobsListResponse();

    return this.parser.parseJobs(jobsListResponse);
  }
}
