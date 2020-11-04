import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { Job } from '../support/support.interface';
import Cheerio = cheerio.Cheerio;

@Injectable()
export class NeoAssistParser {
  /**
   * Extract the jobs ids response.
   *
   * @param response
   * @return {string[]}
   */
  public extractJobsIds(response: AxiosResponse): string[] {
    const $ = cheerio.load(response.data);
    const jobsListLinks = $('.find-job.section .job-list-content h4 a');

    if (jobsListLinks.length === 0) {
      return [];
    }

    return jobsListLinks
      .map((key, element) => {
        return $(element).attr('href').replace('https://jobs.solides.com/neoassist/vaga/', '');
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

    const salary = this.extractJobSalary($);

    return {
      title: this.extractJobTitle($),
      company: {
        name: 'NeoAssist',
        site: 'https://www.neoassist.com/',
      },
      link: response.config.url,
      salary,
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
  protected extractJobTitle($: cheerio.Root): string  {
    return $("body > section div.text-left > h3").text().trim();
  }

  /**
   * Extract job salary.
   *
   * @param $
   * @protected
   */
  protected extractJobSalary($: cheerio.Root): null | number {
    const salaryElement = $("body > section div.text-left > strong.price");
    if (salaryElement.length === 0) {
      return null;
    }

    const salary = salaryElement.text().trim();
    if (salary === 'a combinar') {
      return null;
    }

    return parseFloat(salary);
  }

  /**
   * Extract job description.
   *
   * @param $
   * @protected
   * @return {string}
   */
  protected extractJobDescription($: cheerio.Root): string {
    const elementsToRemove = ['input', 'script'];

    let descriptionFinished = false;
    let description = '';

    $("body > section .content-area .box .custom_format > *")
      .each((index: number, element: cheerio.Element) => {
        if (elementsToRemove.includes(element.tagName) || descriptionFinished) {
          return;
        }

        const $el = $(element);

        if (element.tagName === 'h4') {
          if ($el.text() === 'Requisitos') {
            descriptionFinished = true;
          }

          return;
        }

        description += $el.html().normalize();
      });

    return description;
  }

  /**
   * Extract job level.
   *
   * @param $
   * @protected
   */
  protected extractJobLevel($: cheerio.Root): string | null {
    const title = this.extractJobTitle($);

    if (/Sr\.|S[eê]nior/.test(title)) {
      return 'senior';
    }

    if (/Pl\.|Pleno/.test(title)) {
      return 'pleno';
    }

    if (/Jr\.|J[uú]nior/.test(title)) {
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
  protected extractJobType($: cheerio.Root): string | null{
    const title = this.extractJobTitle($);

    if (/Analista de Testes|\(QA\)/.test(title)) {
      return 'QA';
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

    if (
      /[Ff]ull[-]?[Ss]tack/.test(title) ||
      /[Dd]esenvolvedor[a]?/.test(title)
    ) {
      return 'Full-stack';
    }

    return null;
  }
}
