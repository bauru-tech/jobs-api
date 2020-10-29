export type Job = string;

export interface HasJobs {
    /**
     * FInd jobs in company.
     *
     * @return {Promise<Job[]>}
     */
    findJobs(): Promise<Job[]>;
}
