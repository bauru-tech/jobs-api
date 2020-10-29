export type Job = string[];

export interface HasJobs {
    findJobs(): Job[]
}
