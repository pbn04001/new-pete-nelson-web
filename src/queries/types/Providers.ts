/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Providers
// ====================================================

export interface Providers_providers_providers {
  __typename: "Provider";
  id: number;
  name: string;
  location: string;
}

export interface Providers_providers {
  __typename: "ProviderList";
  uuid: string;
  providers: Providers_providers_providers[];
}

export interface Providers {
  providers: Providers_providers;
}
