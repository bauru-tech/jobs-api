export interface Company {
  name: string;
  site: string;
}

export interface Job {
  title: string;
  company: Company;
  link: string;
  salary: null | string;
  level: null | string;
  type: null | string;
  description: string;
}

export interface HasJobs {
  /**
   * FInd jobs in company.
   *
   * @return {Promise<Job[]>}
   */
  findJobs(): Promise<Job[]>;
}
