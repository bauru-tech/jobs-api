import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as cheerio from "cheerio";
import { Job } from '../support/support.interface';

@Injectable()
export class LabsPaschoalottoParser {
  /**
   * Extract the jobs links response.
   *
   * @param response
   * @return {string[]}
   */
  public extractJobsLinks(response: AxiosResponse): string[] {
    const $ = cheerio.load(response.data);

    const jobsListLinks = $('div[data-segment="Tecnologia da Informação"] > .positions > .container > a');


    if (jobsListLinks.length === 0) {
      console.log('sem links');

      return [];
    }

    return jobsListLinks
      .map((key, element) => {
        return $(element).attr('href');
      })
      .get();
  }

  /**
   * Parse the job from response.
   *
   * @param response
   * @return {Job}
   */
  public parseJob(response: AxiosResponse): Job {
    const $ = cheerio.load(response.data);

    return {
      title: this.extractJobTitle($),
      company: {
        name: 'Paschoalotto',
        site: 'https://labspaschoalotto.com.br/',
      },
      link: response.config.url,
      salary: null,
      description: this.extractJobDescription($),
      level: this.extractJobLevel($),
      type: this.extractJobType($),
    };
  }

  /**
   * Extract job title.
   *
   * @param $
   * @protected
   */
  protected extractJobTitle($: cheerio.Root): string {
    return $('h1').first().text();
  }

  /**
   * Extract job description.
   *
   * @param $
   * @protected
   */
  protected extractJobDescription($: cheerio.Root): string {
    return $('.description').text().trim();
  }

  /**
   * Extract job level.
   *
   * @param $
   * @protected
   */
  protected extractJobLevel($: cheerio.Root): string | null {
    const title = this.extractJobTitle($);

    if (/(Sr[.]?$)|(S[eê]nior)/.test(title)) {
      return 'senior';
    }

    if (/(Pl[.]?$)|(Pleno)/.test(title)) {
      return 'pleno';
    }

    if (/(Jr[.]?$)|(J[uú]nior)/.test(title)) {
      return 'junior';
    }

    return null;
  }

  /**
   * Extract job type.
   *
   * @param $
   * @private
   */
  protected extractJobType($: cheerio.Root): string | null {
    const title = this.extractJobTitle($).toLowerCase();

    if (/analista de teste[s]?|\(qa\)|quality assurance/.test(title)) {
      return 'QA';
    }

    if (/back[-]?end/.test(title)) {
      return 'Back-end';
    }

    if (/front[-]?end/.test(title)) {
      return 'Front-end';
    }

    if (/designer/.test(title)) {
      return 'Designer';
    }

    if (
      /full[-]?stack/.test(title) ||
      /desenvolvedor[a]?/.test(title)
    ) {
      return 'Full-stack';
    }

    return null;
  }
}
