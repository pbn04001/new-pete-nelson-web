import { gql } from 'apollo-boost'

export default gql`
  query Skills($type: SkillType) {
    skills(type: $type) {
      name
      type
    }
  }
`
