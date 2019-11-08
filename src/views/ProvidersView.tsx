import React from 'react';
import { withApollo } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import providerQuery from '../queries/providers'
import {Providers as ProvidersGQL } from "../queries/types/Providers";
import ProvidersPricingView from "./ProviderPricingView";

type ProvidersViewProps = {
  client: ApolloClient<InMemoryCache>,
}

const ProvidersView: React.FC<ProvidersViewProps> = ({
  client,
}: ProvidersViewProps) => {
  const { data: providers, loading } = useQuery<ProvidersGQL>(providerQuery, { client })

  if (loading || !providers?.providers) return <div>Loading...</div>

  return (
    <ProvidersPricingView providers={providers.providers} client={client} />
  )
}

export default withApollo(ProvidersView)
