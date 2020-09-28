import { ApolloClient, InMemoryCache } from "@apollo/client";

function getApolloClient () {
  return new ApolloClient({
    uri: process.env.graphQlEndpoint,
    cache: new InMemoryCache()
  });
}

export default getApolloClient;