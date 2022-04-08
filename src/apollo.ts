import {ApolloClient, createHttpLink, InMemoryCache, makeVar, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from '@apollo/client/link/context';
import {LOCAL_STORAGE_TOKEN} from './constants';

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const isLoggedInVar = makeVar(!!token);
export const authToken = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: authToken() || '',
    },
  },
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      Authorization: authToken() || '',
    },
  };
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read: () => isLoggedInVar(),
          },
          token: {
            read: () => authToken,
          },
        },
      },
    },
  }),
});
