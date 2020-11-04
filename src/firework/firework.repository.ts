import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class FireworkRepository {
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
      .get('https://fireworkweb.com.br/vagas/')
      .toPromise();
  }
}
