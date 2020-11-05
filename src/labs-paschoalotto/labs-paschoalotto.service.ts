import { Inject, Injectable } from '@nestjs/common';
import { HasJobs, Job } from '../support/support.interface';
import { LabsPaschoalottoParser } from './labs-paschoalotto.parser';
import { LabsPaschoalottoRepository } from './labs-paschoalotto.repository';

@Injectable()
export class LabsPaschoalottoService implements HasJobs {
  /**
   * LabsPaschoalottoRepository.
   *
   * @protected
   */
  @Inject(LabsPaschoalottoRepository)
  protected repository: LabsPaschoalottoRepository;

  /**
   * LabsPaschoalottoParser.
   *
   * @protected
   */
  @Inject(LabsPaschoalottoParser)
  protected parser: LabsPaschoalottoParser;

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
