import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class LabsPaschoalottoRepository {
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
      .get('https://jobs.kenoby.com/paschoalotto/position?search=')
      .toPromise();
  }

  /**
   * Get the job page response.
   *
   * @return {Promise<AxiosResponse>}
   */
  public getJobResponse(link: string): Promise<AxiosResponse> {
    return this.httpService
      .get(link)
      .toPromise();
  }
}
