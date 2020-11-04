import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Job } from '../support/support.interface';
import * as cheerio from "cheerio";

@Injectable()
export class FireworkParser {
  /**
   * Parse jobs.
   *
   * @param response
   */
  public parseJobs(response: AxiosResponse): Job[] {
    const $ = cheerio.load(response.data);
    const jobs = $('.grve-container > div > div:nth-child(3) > div article');

    if (jobs.length === 0) {
      return [];
    }

    return jobs
      .map((key, element): Job => {
        const $el = $(element);

        return {
          title: this.extractJobTitle($el),
          company: {
            name: 'Firework',
            site: 'https://fireworkweb.com.br/',
          },
          link: this.extractJobLink($el),
          salary: null,
          level: this.extractJobLevel($el),
          type: this.extractJobType($el),
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
    return $el.find("a").first().text();
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
   * Extract job level.
   *
   * @param $el
   * @protected
   */
  protected extractJobLevel($el: cheerio.Cheerio) {
    const title = this.extractJobTitle($el);

    if (/[Ss][eê]nior/.test(title)) {
      return 'senior';
    }

    if (/[Pp]leno/.test(title)) {
      return 'pleno';
    }

    if (/[Jj][uú]nior/.test(title)) {
      return 'junior';
    }

    return null;
  }

  /**
   * Extract job type.
   *
   * @param $el
   * @private
   */
  protected extractJobType($el: cheerio.Cheerio) {
    const title = this.extractJobTitle($el);

    if (/Analista de Testes|\(QA\)/.test(title)) {
      return 'QA';
    }

    if (/[Ff]ull[-]?[Ss]tack/.test(title)) {
      return 'Full-stack';
    }

    if (/[Bb]ack[-]?[Ee]nd/.test(title)) {
      return 'Back-end';
    }

    if (/[Ff]ront[-]?[Ee]nd/.test(title)) {
      return 'Front-end';
    }

    if (/[Dd]esigner/.test(title)) {
      return 'Designer';
    }

    if (/[Mm]obile/.test(title)) {
      return 'Mobile';
    }

    if (/[Dd]ev[-]?[Oo]ps/.test(title)) {
      return 'DevOps';
    }

    return null;
  }

  /**
   * Extract job description.
   *
   * @param $el
   * @protected
   */
  protected extractJobDescription($el: cheerio.Cheerio) {
    return $el.find("div[itemprop='articleBody'] p").text();
  }
}
