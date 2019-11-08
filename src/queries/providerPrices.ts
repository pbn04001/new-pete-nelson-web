import { gql } from 'apollo-boost'

export default gql`
  query ProviderPrices($uuid: String!) {
    providerPrices(uuid: $uuid) {
      id
      price
    }
  }
`
