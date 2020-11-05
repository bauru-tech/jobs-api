import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Job } from '../support/support.interface';
import * as cheerio from "cheerio";

@Injectable()
export class GalataParser {
  /**
   * Parse jobs.
   *
   * @param response
   */
  public parseJobs(response: AxiosResponse): Job[] {
    const $ = cheerio.load(response.data);
    const jobs = $('.sjb-listing .list-view .list-data');

    if (jobs.length === 0) {
      return [];
    }

    return jobs
      .map((key, element): Job => {
        const $el = $(element);

        return {
          title: this.extractJobTitle($el),
          company: {
            name: 'Galata',
            site: 'https://galata.com.br',
          },
          link: this.extractJobLink($el),
          salary: null,
          level: null,
          type: null,
          description: this.extractJobDescription($el),
        };
      })
      .get();
  }

  /**
   * Extract job title.
   *
   * @param $el
   * @protected
   */
  protected extractJobTitle($el: cheerio.Cheerio) {
    return $el.find(".job-title").first().text();
  }

  /**
   * Extract job link.
   *
   * @param $el
   * @protected
   */
  protected extractJobLink($el: cheerio.Cheerio) {
    return $el.find("a").first().attr('href');
  }

  /**
   * Extract job description.
   *
   * @param $el
   * @protected
   */
  protected extractJobDescription($el: cheerio.Cheerio) {
    return $el.find(".job-description").text();
  }
}
