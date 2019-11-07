import { gql } from 'apollo-boost'

export default gql`
  query Providers {
    providers {
      id
      name
      location
    }
  }
`
