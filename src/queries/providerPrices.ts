import { gql } from 'apollo-boost'

export default gql`
  query ProviderPrices {
    providerPrices {
      id
      price
    }
  }
`
