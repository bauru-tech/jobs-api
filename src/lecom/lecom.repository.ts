import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class LecomRepository {
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
      .get('https://www.lecom.com.br/trabalhe-com-a-gente/', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': ' Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
          Origin: 'https://www.lecom.com.br/',
          Referer: 'https://www.lecom.com.br/trabalhe-com-a-gente/',
          'Accept-Language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7'
        }
      })
      .toPromise();
  }
}
