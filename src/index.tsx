import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { withApollo } from 'react-apollo'
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import SVG from 'react-inlinesvg-2';

import {isProd} from "./utils/envs";
import App from './App';
import * as serviceWorker from './serviceWorker';

const files = require.context('assets', true, /.*\.svg$/);
files.keys().forEach(files);

const url = isProd() ?
  'https://ttu0bk9oc0.execute-api.us-west-2.amazonaws.com/prod/graphql' :
  'https://6or7w5l6lj.execute-api.us-west-2.amazonaws.com/dev/graphql'

const httpLink = new HttpLink({ uri: url });

const authLink = new ApolloLink((operation, forward) => {
    // Call the next link in the middleware chain.
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache()
});

const AppWithApollo = withApollo(App)

ReactDOM.render(
    <ApolloProvider client={client}>
      <SVG src={`/sprite.svg`} />
      <AppWithApollo />
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
