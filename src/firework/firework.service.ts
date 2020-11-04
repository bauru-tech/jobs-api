import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { FireworkRepository } from './firework.repository';
import { FireworkParser } from './firework.parser';

@Injectable()
export class FireworkService implements HasJobs {
  /**
   * FireworkRepository.
   *
   * @protected
   */
  @Inject(FireworkRepository)
  protected repository: FireworkRepository;

  /**
   * FireworkParser.
   *
   * @protected
   */
  @Inject(FireworkParser)
  protected parser: FireworkParser;

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
