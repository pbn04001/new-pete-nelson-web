import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import providerQuery from '../queries/providers'
import {Providers as ProvidersGQL, Providers_providers_providers } from "../queries/types/Providers";
import {ProviderPrices, ProviderPrices_providerPrices } from "../queries/types/ProviderPrices";
import providerPricesQuery from "../queries/providerPrices";

const renderPrice = (price?: number) => {
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
  const [count, setCount ] = useState(0)
  const [prices, updatePrices ] = useState<{ [key: number]: number }>({})
  const { data: providers, loading } = useQuery<ProvidersGQL>(providerQuery, { client })
  const priceValues = useQuery<ProviderPrices>(providerPricesQuery, {
    client,
    pollInterval: 1000
  })
  const { data: newPrices, stopPolling } = priceValues;

  useEffect(() => {
    console.log(`Polled ${count} times`)
    if (count >= 20) {
      stopPolling()
    } else {
      setCount(count + 1)
    }

    if (newPrices?.providerPrices && newPrices.providerPrices.length > 0) {
      const updatedPrices: { [key: number]: number } = {
        ...prices,
      }
      for (const price of newPrices.providerPrices) {
        updatedPrices[price.id] = price.price
      }
      updatePrices(updatedPrices)
    }
  }, [priceValues])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Provider Prices</h1>
      {providers?.providers.providers.map(provider => (
        <div key={provider.id}>
          <div>{provider.name}</div>
          <div>{provider.location}</div>
          {renderPrice(prices[provider.id])}
          <br/>
        </div>
      ))}
    </div>
  )
}

export default withApollo(ProvidersView)
