import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Job } from '../support/support.interface';

@Injectable()
export class ArcaSolutionsParser {
  /**
   * Parse jobs.
   *
   * @param response
   */
  public parseJobs(response: AxiosResponse): Job[] {
    return response.data
      .data
      .openings
      .filter(job => job.status === true)
      .map((job): Job => {
        return {
          title: job.job_position.name_pt,
          company: {
            name: 'Arca Solutions',
            site: 'https://www.arcasolutions.com/',
          },
          link: `https://www.arcasolutions.com/job/${job.id}`,
          salary: null,
          level: this.extractJobLevel(job),
          type: this.extractJobType(job),
          description: job.job_position.description_pt,
        }
      });
  }

  /**
   * Extract the job level.
   *
   * @param job
   * @protected
   */
  protected extractJobLevel(job: any): string | null {
    const title = job.job_position.name_pt;

    if (/[Ss][eê]nior/.test(title)) {
      return 'senior';
    }

    if (/[Pp]leno/.test(title)) {
      return 'pleno';
    }

    if (/[Jj][uú]nior/.test(title)) {
      return 'junior';
    }

    if (/[Tt]rainee/.test(title)) {
      return 'trainee';
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
    const title = job.job_position.name_pt;;

    if (/Analista de (Qualidade|Teste)|\(QA\)/.test(title)) {
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

    if (/[Mm]obile/.test(title)) {
      return 'Mobile';
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
