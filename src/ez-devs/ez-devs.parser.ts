import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Job } from '../support/support.interface';

@Injectable()
export class EzDevsParser {
  /**
   * Parse jobs.
   *
   * @param response
   */
  public parseJobs(response: AxiosResponse): Job[] {
    return response.data
      .filter(({ status }) => status === 'ABERTA')
      .map((job): Job => {
        return {
          title: job.title,
          company: {
            name: 'EZ.devs',
            site: 'https://ezdevs.com.br/',
          },
          link: 'https://heroes.ezdevs.com.br/#jobs',
          salary: this.extractJobSalary(job),
          level: this.extractJobLevel(job),
          type: this.extractJobType(job),
          description: job.description,
        };
      });
  }

  /**
   * Extract the job salary.
   *
   * @param job
   * @protected
   */
  protected extractJobSalary(job: any): number | null {
    const budgetText = job.budgetMax || job.budgetMin;

    if (!budgetText) {
      return null;
    }

    const budget = parseFloat(budgetText.replace(/[^0-9,-]+/g,"").replace(",", "."));
    if (budgetText.includes('k')) {
      return budget * 1000;
    }

    return budget;
  }

  /**
   * Extract the job level.
   *
   * @param job
   * @protected
   */
  protected extractJobLevel(job: any): string | null {
    if (/[Ss][eê]nior/.test(job.level)) {
      return 'senior';
    }

    if (/[Pp]leno/.test(job.level)) {
      return 'pleno';
    }

    if (/[Jj][uú]nior/.test(job.level)) {
      return 'junior';
    }

    return null;
  }

  /**
   * Extract job type.
   *
   * @param job
   * @protected
   */
  protected extractJobType(job: any): string | null {
    if (/Analista de Testes|\(QA\)/.test(job.title)) {
      return 'QA';
    }

    if (/[Bb]ack[-]?[Ee]nd/.test(job.title)) {
      return 'Back-end';
    }

    if (/[Ff]ront[-]?[Ee]nd/.test(job.title)) {
      return 'Front-end';
    }

    if (/[Dd]esigner/.test(job.title)) {
      return 'Designer';
    }

    if (/[Mm]obile/.test(job.title)) {
      return 'Mobile';
    }

    if (
      /[Ff]ull[-]?[Ss]tack/.test(job.title) ||
      /[Dd]esenvolvedor[a]?/.test(job.title)
    ) {
      return 'Full-stack';
    }

    return null;
  }
}
