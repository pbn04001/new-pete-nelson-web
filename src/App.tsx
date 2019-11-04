import React from 'react';
import {Query} from 'react-apollo'
import skillsQuery from './queries/skills'
import {Skills, SkillsVariables} from './queries/types/Skills'
import {SkillType} from "./types/graphql-global-types";

import './App.css';

class SkillsQuery extends Query<Skills, SkillsVariables>{}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <SkillsQuery
            query={skillsQuery}
            variables={{ type: SkillType.SERVER }}
        >
            {({ data }) => (
                <>
                    <h1>Skills</h1>
                    {data && data.skills && data.skills.map(skill => {
                        return <div>{skill.name} - {skill.type}</div>;
                    })}
                </>
            )}
        </SkillsQuery>
    </div>
  );
}

export default App;
