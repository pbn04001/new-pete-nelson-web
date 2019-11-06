/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SkillType } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: Skills
// ====================================================

export interface Skills_skills {
  __typename: "Skill";
  name: string;
  type: SkillType;
}

export interface Skills {
  skills: Skills_skills[];
}

export interface SkillsVariables {
  type?: SkillType | null;
}
