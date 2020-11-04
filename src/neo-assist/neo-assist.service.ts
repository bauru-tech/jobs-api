import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { NeoAssistParser } from './neo-assist.parser';
import { NeoAssistRepository } from './neo-assist.repository';

@Injectable()
export class NeoAssistService implements HasJobs {
  /**
   * NeoAssistRepository.
   *
   * @protected
   */
  @Inject(NeoAssistRepository)
  protected repository: NeoAssistRepository;

  /**
   * NeoAssistParser.
   *
   * @protected
   */
  @Inject(NeoAssistParser)
  protected parser: NeoAssistParser;

  /**
   * Find jobs from company.
   *
   * @return {Promise<Job[]>}
   */
  public async findJobs(): Promise<Job[]> {
    const jobsListResponse = await this.repository.getJobsListResponse();
    const jobsIds = this.parser.extractJobsIds(jobsListResponse);

    const jobsResponses = await Promise.all(jobsIds.map((id: string) => {
      return this.repository
        .getJobResponse(id)
        .catch(() => null);
    }));

    return jobsResponses.filter(r => !!r)
      .map(response => this.parser.parseJob(response));
  }
}
