import React from 'react';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import providerQuery from '../queries/providers'
import {Providers as ProvidersGQL, Providers_providers } from "../queries/types/Providers";
import {ProviderPrices, ProviderPrices_providerPrices } from "../queries/types/ProviderPrices";
import providerPricesQuery from "../queries/providerPrices";

const renderPrice = (provider: Providers_providers, prices?: ProviderPrices_providerPrices[]) => {
  if (!prices) return null

  const price = prices.find(price => price.id === provider.id)?.price
  if (price) {
    return <div>${price}</div>
  }
  return null;
}

type ProvidersProps = {
  client: ApolloClient<InMemoryCache>,
}

const ProvidersView: React.FC<ProvidersProps> = ({
  client,
}: ProvidersProps) => {
  const { data: providers, loading: loading } = useQuery<ProvidersGQL>(providerQuery, {client })
  const { data: prices } = useQuery<ProviderPrices>(providerPricesQuery, { client })

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {providers?.providers.map(provider => (
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

export default ProvidersView
