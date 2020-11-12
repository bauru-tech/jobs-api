import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class FinchRepository {
  /**
   * HttpService.
   *
   * @protected
   */
  @Inject(HttpService)
  protected httpService: HttpService;

  /**
   * Get jobs response.
   *
   * @param page
   * @return {Promise<AxiosResponse>}
   */
  public getJobsResponse(page: number): Promise<AxiosResponse> {
    return this.httpService
      .get(`https://finchsolucoes.compleo.com.br/filial/FinchSolu%C3%A7%C3%B5es/Pesquisar?page=${page}&pesquisa=`)
      .toPromise();
  }

  /**
   * Get the job details response.
   *
   * @param url
   * @return {Promise<AxiosResponse>}
   */
  public getJobDetailsResponse(url: string): Promise<AxiosResponse> {
    return this.httpService
      .get(url)
      .toPromise();
  }
}
