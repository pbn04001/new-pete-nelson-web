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

export interface Jobs_jobs {
  __typename: "Job";
  title: string;
  company: string;
  location: Jobs_jobs_location;
}

export interface Jobs {
  jobs: Jobs_jobs[];
}

export interface JobsVariables {
  state?: State | null;
}
