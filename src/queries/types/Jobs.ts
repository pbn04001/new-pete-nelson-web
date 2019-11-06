/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { State } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: Jobs
// ====================================================

export interface Jobs_jobs_location {
  __typename: "Location";
  city: string;
  state: State;
}

export interface Jobs_jobs_dates_from {
  __typename: "Date";
  year: string | null;
  month: string | null;
}

export interface Jobs_jobs_dates_to {
  __typename: "Date";
  year: string | null;
  month: string | null;
}

export interface Jobs_jobs_dates {
  __typename: "DateRange";
  from: Jobs_jobs_dates_from | null;
  to: Jobs_jobs_dates_to | null;
}

export interface Jobs_jobs {
  __typename: "Job";
  title: string;
  company: string;
  location: Jobs_jobs_location;
  dates: Jobs_jobs_dates[];
  achievements: string[];
}

export interface Jobs {
  jobs: Jobs_jobs[];
}

export interface JobsVariables {
  state?: State | null;
}
