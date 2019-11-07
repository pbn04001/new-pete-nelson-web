import React from 'react';
import { withApollo } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import providerQuery from '../queries/providers'
import {Providers as ProvidersGQL, Providers_providers_providers } from "../queries/types/Providers";
import {ProviderPrices, ProviderPrices_providerPrices } from "../queries/types/ProviderPrices";
import providerPricesQuery from "../queries/providerPrices";

const renderPrice = (provider: Providers_providers_providers, prices?: ProviderPrices_providerPrices[]) => {
  if (!prices) return null

  const price = prices.find(price => price.id === provider.id)?.price
  if (price) {
    return <div>${price}</div>
  }
  return null;
}

type ProvidersViewProps = {
  client: ApolloClient<InMemoryCache>,
}

const ProvidersView: React.FC<ProvidersViewProps> = ({
  client,
}: ProvidersViewProps) => {
  const { data: providers, loading: loading } = useQuery<ProvidersGQL>(providerQuery, {client })
  const { data: prices } = useQuery<ProviderPrices>(providerPricesQuery, { client })

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Provider Prices</h1>
      {providers?.providers.providers.map(provider => (
        <div key={provider.id}>
          <div>{provider.name}</div>
          <div>{provider.location}</div>
          {renderPrice(provider, prices?.providerPrices)}
          <br/>
        </div>
      ))}
    </div>
  )
}

export default withApollo(ProvidersView)
