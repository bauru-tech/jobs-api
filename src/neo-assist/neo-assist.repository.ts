import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class NeoAssistRepository {
  /**
   * HttpService.
   *
   * @protected
   */
  @Inject(HttpService)
  protected httpService: HttpService;

  /**
   * Get the jobs list page response.
   *
   * @return {Promise<AxiosResponse>}
   */
  public getJobsListResponse(): Promise<AxiosResponse> {
    return this.httpService
      .get('https://jobs.solides.com/neoassist')
      .toPromise();
  }

  /**
   * Get the job page response.
   *
   * @return {Promise<AxiosResponse>}
   */
  getJobResponse(id: string): Promise<AxiosResponse> {
    return this.httpService
      .get(`https://jobs.solides.com/neoassist/vaga/${id}`)
      .toPromise();
  }
}
