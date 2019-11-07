import React from 'react';
import { Query } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost';

import skillsQuery from './queries/skills'
import jobsQuery from './queries/jobs'
import {Skills, SkillsVariables} from './queries/types/Skills'
import {Jobs, JobsVariables} from "./queries/types/Jobs";


import providerQuery from './queries/providers'
import {Providers} from "./queries/types/Providers";
import { useQuery } from 'react-apollo-hooks';

import './App.css';
import {SkillType, State} from "./types/graphql-global-types";
import {ProviderPrices} from "./queries/types/ProviderPrices";
import providerPricesQuery from "./queries/providerPrices";

type AppProps = {
  client: ApolloClient<InMemoryCache>,
}

const renderPrice = (price?: number) => {
  if (price) {
    return <div>${price}</div>
  }
}

const App: React.FC<AppProps> = ({ client }: AppProps) => {
  const { data: providers, loading: loading } = useQuery<Providers>(providerQuery, {client })
  const { data: prices } = useQuery<ProviderPrices>(providerPricesQuery, { client })

  let providersComp;
  if (loading) {
    providersComp = <div>'Loading...'</div>
  } else {
    providersComp = (
      <div>
        {providers?.providers.map(provider => (
          <>
            <div>{provider.name}</div>
            <div>{provider.location}</div>
            {/* eslint-disable-next-line no-restricted-globals */}
            {renderPrice(prices?.providerPrices?.find(price => price.id == provider.id)?.price)}
            <br/>
          </>
        ))}
      </div>);
  }

  return (
    <div className="App">
      <Query<Skills, SkillsVariables>
        query={skillsQuery}
        variables={{ type: SkillType.DATABASE}}
      >
        {({data}) => (
          <>
            <h1>Skills</h1>
            {data && data.skills && data.skills.map(skill => {
              return (
                <div>{skill.name} - {skill.type}</div>
              );
            })}
          </>
        )}
      </Query>
      <Query<Jobs, JobsVariables>
        query={jobsQuery}
        variables={{ state: State.CO }}
      >
        {({data}) => (
          <>
            <h1>Jobs</h1>
            {data && data.jobs && data.jobs.map(job => (
              <div className="job">
                <div className="job__title">{job.title}</div>
                <div className="job_company">{job.company}</div>
              </div>
            ))}
          </>
        )}
      </Query>
      <h1>Provider Prices</h1>
      {providersComp}
    </div>
  );
}

export default App;
