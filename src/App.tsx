import React from 'react';
import {Query} from 'react-apollo'
import skillsQuery from './queries/skills'
import {Skills, SkillsVariables} from './queries/types/Skills'
import {SkillType} from "./types/graphql-global-types";

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
    <Query<Skills, SkillsVariables>
        query={skillsQuery}
        /*variables={{ type: SkillType.SERVER }}*/
    >
        {({ data }) => (
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
    </div>
  );
}

export default App;
