import { gql } from 'apollo-boost'

export default gql`
  query Providers {
    providers {
      uuid
      providers {
        id
        name
        location
      }
    }
  }
`
