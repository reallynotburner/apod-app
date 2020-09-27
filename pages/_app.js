import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../styles/globals.css';

const client = new ApolloClient({
  uri: process.env.graphQlEndpoint,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
