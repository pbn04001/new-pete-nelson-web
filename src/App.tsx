import React from 'react';
import { Query, withApollo } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost';

import skillsQuery from './queries/skills'
import jobsQuery from './queries/jobs'
import {Skills, SkillsVariables} from './queries/types/Skills'
import {Jobs, JobsVariables} from "./queries/types/Jobs";
import {SkillType, State} from "./types/graphql-global-types";

import './App.css';

import ProvidersView from './views/ProvidersView'

type AppProps = {
  client: ApolloClient<InMemoryCache>,
}

const App: React.FC<AppProps> = ({ client }: AppProps) => {
  const ProvidersViewWithApollo = withApollo(ProvidersView);

  return (
    <div className="App">
      <Query<Skills, SkillsVariables>
        query={skillsQuery}
        variables={{ type: SkillType.DATABASE}}
      >
        {({data}) => (
          <>
            <h1>Skills</h1>
            {data?.skills.map(skill => {
              return (
                <div key={skill.name}>{skill.name} - {skill.type}</div>
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
            {data?.jobs.map(job => (
              <div key={job.company} className="job">
                <div className="job__title">{job.title}</div>
                <div className="job_company">{job.company}</div>
              </div>
            ))}
          </>
        )}
      </Query>
      <h1>Provider Prices</h1>
      <ProvidersViewWithApollo />
    </div>
  );
}

export default App;
