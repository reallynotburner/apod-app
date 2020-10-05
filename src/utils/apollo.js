import { ApolloClient, InMemoryCache } from "@apollo/client";

export function getApolloClient () {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT_CLIENT,
    cache: new InMemoryCache()
  });
}

export function getApolloServer () {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT_SERVER,
    cache: new InMemoryCache()
  });
}
