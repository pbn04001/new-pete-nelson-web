import { gql } from 'apollo-boost'

export default gql`
  query Jobs($state: State) {
    jobs(state: $state) {
        title
        company
        location {
          city
          state
        }
      }
} 
 `
