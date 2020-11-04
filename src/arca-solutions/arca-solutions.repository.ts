import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class ArcaSolutionsRepository {
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
      .post(
        'https://arca360.com.br/graphql',
        {
          "operationName": "Openings",
          "variables":{},
          "query": `query Openings($id: ID) {
            openings(where: {job_position: {job_positions_group: {id: $id}}}) {
              id
              status
              job_position {
                name_pt
                description_pt
                job_positions_group {
                  id
                  name_pt
                }
              }
              opening_tags {
                name_pt
                display_front
              }
            }
          }`
        },
        {
          headers: {
            'authority': 'arca360.com.br',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'accept': '*/*',
            'user-agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
            'content-type': 'application/json',
            'origin': 'https://www.arcasolutions.com',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.arcasolutions.com/',
            'accept-language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7',
            'Content-Type': 'application/json; charset=UTF-8'
          },
        }
      ).toPromise();
  }
}
