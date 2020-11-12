import { AxiosResponse } from 'axios';
import { Job } from '../support/support.interface';
import { Injectable } from '@nestjs/common';
import * as cheerio from "cheerio";

@Injectable()
export class FinchParser {
  /**
   * Has more pages.
   *
   * @param response
   * @return {boolean}
   */
  public hasMorePages(response: AxiosResponse): boolean {
    const data = response.data;
    if (!data.sucesso) {
      return false;
    }

    const $ = cheerio.load(data.viewLista);

    return $(".PagedList-skipToNext").length > 0;
  }
  /**
   * Parse jobs.
   *
   * @param response
   * @return {Job[]}
   */
  public parseJobs(response: AxiosResponse): Job[] {
    const $ = cheerio.load(response.data.viewLista);
    const jobs = $('.vaga-div');

    if (jobs.length === 0) {
      return [];
    }

    return jobs
      .map((key, element): Job => {
        const $el = $(element);

        return {
          title: this.extractJobTitle($el),
          company: {
            name: 'Finch',
            site: 'http://www.finchsolucoes.com.br/',
          },
          link: this.extractJobLink($el),
          salary: null,
          level: this.extractJobLevel($el, $),
          type: this.extractJobType($el),
          description: '',
        };
      })
      .get();
  }

  /**
   * Extract job title.
   *
   * @param $el
   * @return {string}
   * @protected
   */
  protected extractJobTitle($el: cheerio.Cheerio): string {
    return $el.find(".titulo-vaga").first().text();
  }

  /**
   * Extract job link.
   *
   * @param $el
   * @return {string}
   * @protected
   */
  protected extractJobLink($el: cheerio.Cheerio): string {
    return `https://finchsolucoes.compleo.com.br${$el.find("a").first().attr('href')}`;
  }

  /**
   * Extract job level.
   *
   * @param $el
   * @param $
   * @param {string | null}
   * @protected
   */
  protected extractJobLevel($el: cheerio.Cheerio, $: cheerio.Root): string | null {
    const levelArea = $el.find('.local-vaga')
      .filter((index: number, el: cheerio.Element) => $(el).text().startsWith('Experiência'));

    const level = levelArea.length === 0 ? '' : levelArea.text().replace('Experiência: ', '').toLowerCase();
    const title = this.extractJobTitle($el).toLowerCase();

    return [level, title].reduce((acc: string | null, text: string) => {
      if (acc !== null) {
        return acc;
      }

      if (/(s[eê]nior)|(especialista)|(sr\.)/.test(text)) {
        return 'senior';
      }

      if (/(pleno)|(pl\.)/.test(text)) {
        return 'pleno';
      }

      if (/(j[uú]nior)|(jr\.)/.test(text)) {
        return 'junior';
      }

      return null;
    }, null);
  }

  /**
   * Extract job type.
   *
   * @param $el
   * @return {string | null}
   * @private
   */
  protected extractJobType($el: cheerio.Cheerio): string | null {
    const title = this.extractJobTitle($el).toLowerCase();

    if (/full[- ]?stack/.test(title)) {
      return 'Full-stack';
    }

    if (/back[- ]?end/.test(title)) {
      return 'Back-end';
    }

    if (/front[- ]?end/.test(title)) {
      return 'Front-end';
    }

    if (/dev[- ]?ops/.test(title)) {
      return 'DevOps';
    }

    return null;
  }

  /**
   * Parse description.
   *
   * @param response
   * @return {string}
   */
  public parseDescription(response: AxiosResponse): string {
    const $ = cheerio.load(response.data);

    return $('.vaga-descricao-area').text();
  }
}
